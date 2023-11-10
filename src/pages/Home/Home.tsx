import { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import { apiGetPopularity, apiSearch } from '@/api';
import { SearchQueryContext, SearchResultContext } from '@/contexts';
import { Photo } from '@/utils/interfaces';
import { Status } from '@/utils/types';
import { hasErrorMessage } from '@/utils/functions';
import { RoutePaths } from '@/routes/routes.enum';
import { Search } from '@/components/Search';
import { SearchResult } from '@/components/SearchResult';
import { Spinner } from '@/components/Spinner';
import { NotFound } from '@/components/NotFound';
import { Pagination } from '@/components/Pagination';
import { Select } from '@/components/Select';
import { PER_PAGE } from '@/components/Select/Select.enums';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>(localStorage.getItem('searchValue') || '');
  const [searchResult, setSearchResult] = useState<Photo[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [error, setError] = useState<string>('');
  const [perPage, setPerPage] = useState<number>(PER_PAGE[10]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const navigate = useNavigate();

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);

    if (isDetailsOpen) {
      setIsDetailsOpen(false);
      navigate({
        pathname: RoutePaths.HOME,
        search: `?page=1`,
      });
    } else {
      setSearchParams({ page: '1' });
    }
  };

  const handlePageChange = (newPage: number) => {
    if (isDetailsOpen) {
      setIsDetailsOpen(false);
      navigate({
        pathname: RoutePaths.HOME,
        search: `?page=${newPage.toString()}`,
      });
    } else {
      setSearchParams({ page: newPage.toString() });
    }
  };

  const handleInputChange = useCallback((newValue: string): void => {
    setSearchValue(newValue);

    if (isDetailsOpen) {
      setIsDetailsOpen(false);
    }

    setSearchParams({ page: '1' }, { replace: true });
    localStorage.setItem('searchValue', newValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetSearchResult = (): void => {
    setStatus('loading');
    setSearchResult([]);
  };

  const handleSearch = async (page: number = 1): Promise<void> => {
    resetSearchResult();

    try {
      const data = searchValue.trim()
        ? await apiSearch(searchValue.trim(), page, perPage)
        : await apiGetPopularity(page, perPage);

      setSearchResult(data.photos);
      setTotalResults(data.total_results);
      setStatus(data.photos.length ? 'success' : 'empty');
    } catch (error: unknown) {
      setStatus('error');
      setError(hasErrorMessage(error) ? error.message : 'Unknown error.');
    }
  };

  const handleItemClick = (id: number) => {
    setIsDetailsOpen(true);
    navigate(`${RoutePaths.DETAILS}?id=${id}&page=${currentPage}`);
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <Spinner size="large" variant="global" />;
      case 'success':
        return (
          <SearchResultContext.Provider
            value={{ searchResult: searchResult, onItemClick: handleItemClick }}
          >
            <SearchResult />
          </SearchResultContext.Provider>
        );
      case 'error':
        return <h3 className={styles.error}>{error}. Try again.</h3>;
      case 'empty':
        return <NotFound />;
      default:
        return <p>Oops! Something went unknown...</p>;
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);

    if (isDetailsOpen) {
      return;
    }

    handleSearch(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isDetailsOpen]);

  return (
    <SearchQueryContext.Provider value={searchValue}>
      <div className="container">
        <Outlet />

        <Search onInputChange={handleInputChange} onSearch={handleSearch} />

        <div className={styles.section}>{renderContent()}</div>

        <div className={styles.footer}>
          <Select value={perPage} onChange={handlePerPageChange} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalResults / perPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </SearchQueryContext.Provider>
  );
};

export default Home;
