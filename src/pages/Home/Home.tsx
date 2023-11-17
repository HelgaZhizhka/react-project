import { useEffect, useCallback } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { hasErrorMessage } from '@/utils/functions';
import { setSearchQuery } from '@/features/search/searchSlice';
import { setCurrentPage, setTotalPages } from '@/features/pagination/paginationSlice';
import { setItemsPerPage } from '@/features/itemsPerPage/itemsPerPageSlice';
import { useSearchPhotosQuery, useGetPopularityQuery } from '@/api/apiService';
import { Search } from '@/components/Search';
import { SearchResult } from '@/components/SearchResult';
import { Spinner } from '@/components/Spinner';
import { NotFound } from '@/components/NotFound';
import { Pagination } from '@/components/Pagination';
import { Select } from '@/components/Select';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  console.log('Home component is rendering');
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.search.query);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const perPage = useAppSelector((state) => state.itemsPerPage.value);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const searchResult = useSearchPhotosQuery(
    { query: searchValue, page: currentPage, perPage },
    { skip: !searchValue.trim() }
  );
  const popularityResult = useGetPopularityQuery(
    { page: currentPage, perPage },
    { skip: !!searchValue.trim() }
  );

  const photos = searchValue.trim() ? searchResult.data?.photos : popularityResult.data?.photos;
  const totalResults = searchValue.trim()
    ? searchResult.data?.total_results
    : popularityResult.data?.total_results;
  const isLoading = searchResult.isLoading || popularityResult.isLoading;
  const error = searchResult.error || popularityResult.error;

  const navigateToFirstPage = () => {
    setSearchParams({ page: '1' });
    dispatch(setCurrentPage(1));
  };

  const handleInputChange = useCallback(
    (newValue: string) => {
      dispatch(setSearchQuery(newValue));
      navigateToFirstPage();
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (newValue: number) => {
      dispatch(setCurrentPage(newValue));
      setSearchParams({ page: newValue.toString() });
    },
    [dispatch]
  );

  const handlePerPageChange = useCallback(
    (newValue: number) => {
      dispatch(setItemsPerPage(newValue));
      navigateToFirstPage();
    },
    [dispatch]
  );

  useEffect(() => {
    if (typeof totalResults === 'number' && perPage > 0) {
      dispatch(setTotalPages(Math.ceil(totalResults / perPage)));
    }
  }, [totalResults]);

  const renderContent = () => {
    if (isLoading) return <Spinner size="large" variant="global" />;
    if (error) {
      return (
        <h3 className={styles.error}>{hasErrorMessage(error) && error.message}. Try again.</h3>
      );
    }

    if (!photos?.length) return <NotFound />;

    return <SearchResult searchResult={photos} currentPage={currentPage} />;
  };

  return (
    <div className={`${styles.root} ${id ? styles.isDetailed : ''}`}>
      <Outlet />
      <div className="container">
        <Search onInputChange={handleInputChange} />
        <div className={styles.section}>{renderContent()}</div>
        <div className={styles.footer}>
          <Select value={perPage} onChange={handlePerPageChange} />
          <Pagination onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default Home;
