import { useEffect } from 'react';
import { Outlet, useSearchParams, useParams, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { hasErrorMessage } from '@/utils/functions';
import { RoutePaths } from '@/routes/routes.enum';
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
import { PER_PAGE } from '@/components/Select/Select.enums';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.search.query);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const perPage = useAppSelector((state) => state.itemsPerPage.value);
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const searchResult = useSearchPhotosQuery(
    { query: searchValue, page: currentPage, perPage },
    { skip: !searchValue.trim() }
  );
  const popularityResult = useGetPopularityQuery(
    { page: currentPage, perPage },
    { skip: !!searchValue.trim() }
  );

  const totalResults = searchValue.trim()
    ? searchResult.data?.total_results
    : popularityResult.data?.total_results;

  const isLoading = searchResult.isLoading || popularityResult.isLoading;
  const error = searchResult.error || popularityResult.error;

  const renderContent = () => {
    if (isLoading) return <Spinner size="large" variant="global" />;
    if (error) {
      return (
        <h3 className={styles.error}>{hasErrorMessage(error) && error.message}. Try again.</h3>
      );
    }

    const photos = searchValue.trim() ? searchResult.data?.photos : popularityResult.data?.photos;

    if (!photos?.length) return <NotFound />;

    return <SearchResult searchResult={photos} onClickCard={navigateToDetailsPage} />;
  };

  const navigateToFirstPage = () => {
    searchParams.set('page', '1');

    if (searchValue) {
      searchParams.set('query', searchValue);
    }

    setSearchParams(searchParams);

    dispatch(setCurrentPage(1));
  };

  const navigateToDetailsPage = (id: number) => {
    if (searchValue) {
      navigate(`${RoutePaths.DETAILS}/${id}?query=${searchValue}&page=${currentPage}`);
    } else {
      navigate(`${RoutePaths.DETAILS}/${id}?page=${currentPage}`);
    }
  };

  const handleSearch = (newValue: string) => {
    const currentQuery = searchParams.get('query');

    if (newValue !== currentQuery) {
      setSearchParams({ query: newValue, page: '1' });
      dispatch(setSearchQuery(newValue));
    }
  };

  const handlePageChange = (newValue: number) => {
    dispatch(setCurrentPage(newValue));

    searchParams.set('page', newValue.toString());

    if (searchValue) {
      searchParams.set('query', searchValue);
    }

    setSearchParams(searchParams);
  };

  const handlePerPageChange = (newValue: number) => {
    dispatch(setItemsPerPage(newValue));
    navigateToFirstPage();
  };

  useEffect(() => {
    const queryFromURL = searchParams.get('query') || '';
    const pageFromURL = parseInt(searchParams.get('page') || '1', PER_PAGE[10]);

    if (queryFromURL !== searchValue) {
      dispatch(setSearchQuery(queryFromURL));
    }

    if (pageFromURL !== currentPage) {
      dispatch(setCurrentPage(pageFromURL));
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (typeof totalResults === 'number' && perPage > 0) {
      dispatch(setTotalPages(Math.ceil(totalResults / perPage)));
    }
  }, [totalResults, perPage, dispatch]);

  return (
    <div className={`${styles.root} ${id ? styles.isDetailed : ''}`}>
      <Outlet />
      <div className="container">
        <Search onSearch={handleSearch} />
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
