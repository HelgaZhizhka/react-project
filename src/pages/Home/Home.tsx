import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { apiGetPopularity, apiSearch } from '../../api';
import { Photo } from '../../utils/interfaces';
import { Status } from '../../utils/types';
import { hasErrorMessage } from '../../utils/functions';
import { Search } from '../../components/Search';
import { SearchResult } from '../../components/SearchResult';
import { Spinner } from '../../components/Spinner';
import { NotFound } from '../../components/NotFound';
import { Pagination } from '../../components/Pagination';
import { Select } from '../../components/Select';
import { PER_PAGE } from '../../components/Select/Select.enums';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>(localStorage.getItem('searchValue') || '');
  const [searchResults, setSearchResults] = useState<Photo[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string>('');
  const [perPage, setPerPage] = useState<number>(PER_PAGE[10]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalResults, setTotalResults] = useState<number>(0);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setSearchParams({ page: '1', per_page: newPerPage.toString() });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), per_page: perPage.toString() });
  };

  const handleInputChange = useCallback((newValue: string): void => {
    setSearchValue(newValue);
    localStorage.setItem('searchValue', newValue);
  }, []);

  const resetSearchResults = (): void => {
    setStatus('loading');
    setSearchResults([]);
  };

  const handleSearch = async (page: number = 1): Promise<void> => {
    resetSearchResults();

    try {
      const data = searchValue.trim()
        ? await apiSearch(searchValue.trim(), page, perPage)
        : await apiGetPopularity(page, perPage);

      setSearchResults(data.photos);
      setTotalResults(data.total_results);
      setStatus(data.photos.length ? 'success' : 'empty');
    } catch (error: unknown) {
      setStatus('error');
      setError(hasErrorMessage(error) ? error.message : 'Unknown error.');
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <Spinner size="large" variant="global" />;
      case 'success':
        return <SearchResult results={searchResults} />;
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
    const perPageFromURL = parseInt(searchParams.get('per_page') || `${PER_PAGE[10]}`, 10);

    if (perPageFromURL !== perPage) {
      setPerPage(perPageFromURL);
    }

    handleSearch(page);
  }, [searchParams]);

  return (
    <div className="container">
      <Search value={searchValue} onInputChange={handleInputChange} onSearch={handleSearch} />

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
  );
};

export default Home;
