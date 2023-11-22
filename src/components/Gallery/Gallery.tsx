// import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

import { hasErrorMessage } from '@/utils/functions';
// import { SearchResponse } from '@/utils/interfaces';
import { Photo } from '@/utils/interfaces';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setCurrentPage } from '@/lib/redux/slices/pagination/paginationSlice';
import {
  // getPopularity,
  // getRunningQueriesThunk,
  // searchPhotos,
  useGetPopularityQuery,
  useSearchPhotosQuery,
} from '@/lib/services/apiService';
// import { wrapper } from '@/lib/redux/store';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { Select } from '@/components/Select';
// import { PER_PAGE } from '@/components/Select/Select.enums';
import { SearchResult } from '@/components/SearchResult';
import { Spinner } from '@/components/Spinner';
import { NotFound } from '@/components/NotFound';
import styles from './Gallery.module.scss';

interface Props {
  galleryData: Photo[] | undefined;
}

const Gallery: React.FC<Props> = ({ galleryData }) => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.search.query);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const perPage = useAppSelector((state) => state.itemsPerPage.value);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handlePerPageChange = (value: number) => {
    dispatch(setCurrentPage(1));
    dispatch(setCurrentPage(value));
  };

  const handleSearch = (query: string) => {
    dispatch(setCurrentPage(1));
    console.log(query);
  };

  let photos: Photo[] | undefined = galleryData;
  let isLoading = false;
  let error = null;

  const searchResult = useSearchPhotosQuery(
    { query: searchValue, page: currentPage, perPage },
    { skip: !searchValue }
  );

  const popularityResult = useGetPopularityQuery(
    { page: currentPage, perPage },
    { skip: !!searchValue }
  );

  photos = searchValue.trim() ? searchResult.data?.photos : popularityResult.data?.photos;

  isLoading = searchResult.isLoading || popularityResult.isLoading;
  error = searchResult.error || popularityResult.error;

  // const totalResults = searchValue
  //   ? searchResult.data?.total_results
  //   : popularityResult.data?.total_results;

  if (isLoading) return <Spinner size="large" variant="global" />;
  if (error) {
    return <h3 className={styles.error}>{hasErrorMessage(error) && error.message}. Try again.</h3>;
  }

  // const photos = searchValue.trim() ? searchResult.data?.photos : popularityResult.data?.photos;

  if (!photos?.length) return <NotFound />;

  return (
    <div className="container">
      <Search onSearch={handleSearch} />
      <div className={styles.section}>
        <SearchResult searchResult={photos} />
      </div>
      <div className={styles.footer}>
        <Select value={perPage} onChange={handlePerPageChange} />
        <Pagination onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Gallery;
