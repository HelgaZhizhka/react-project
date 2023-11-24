import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/query';

import { Photo } from '@/utils/interfaces';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setCurrentPage, setTotalPages } from '@/lib/redux/slices/paginationSlice';
import { setSearchQuery } from '@/lib/redux/slices/searchSlice';
import { setItemsPerPage } from '@/lib/redux/slices/itemsPerPageSlice';
import { useGetPopularityQuery, useSearchPhotosQuery } from '@/lib/services/apiService';
import { setIsLoadingMain } from '@/lib/redux/slices/isLoadingMain';
import { hasErrorMessage } from '@/utils/functions';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { Select } from '@/components/Select';
import { SearchResult } from '@/components/SearchResult';

import styles from '@/styles/Gallery.module.scss';

interface Props {
  photos: Photo[];
  totalResults: number;
}

const Gallery: React.FC<Props> = ({ photos, totalResults }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { query, page, perPage } = router.query;
  let data: Photo[] | undefined;
  let isFetching: boolean | undefined;
  let total: number | undefined;
  let searchQuery: string | undefined;
  let currentPage: number | undefined;
  let itemsPerPage: number | undefined;

  const searchResult = useSearchPhotosQuery(
    query !== undefined ? { query, page, perPage } : skipToken,
    {
      skip: router.isFallback,
    }
  );

  const popularityResult = useGetPopularityQuery(
    page !== undefined && perPage !== undefined ? { page, perPage } : skipToken,
    {
      skip: !!query || router.isFallback,
    }
  );
  searchQuery = useAppSelector((state) => state.search.query);
  currentPage = useAppSelector((state) => state.pagination.currentPage);
  itemsPerPage = useAppSelector((state) => state.itemsPerPage.perPage);

  useEffect(() => {
    if (typeof total === 'number' && typeof itemsPerPage === 'number') {
      dispatch(setTotalPages(Math.ceil(total / +itemsPerPage)));
    }
  }, [dispatch, total, itemsPerPage]);

  if (!popularityResult.data) {
    isFetching = false;
    data = photos;
    total = totalResults;
    searchQuery = query ? query.toString() : '';
    currentPage = page ? +page : 1;
    itemsPerPage = perPage ? +perPage : 10;
  } else {
    data = searchQuery ? searchResult.data?.photos : popularityResult.data?.photos;
    total = searchQuery ? searchResult.data?.total_results : popularityResult.data?.total_results;
    isFetching = searchResult.isLoading || popularityResult.isFetching;
    const error = searchResult.error || popularityResult.error;

    if (error) {
      return (
        <h3 className={styles.error}>{hasErrorMessage(error) && error.message}. Try again.</h3>
      );
    }
  }

  dispatch(setIsLoadingMain(isFetching));

  // dispatch(setIsLoadingMain(isFetching));

  // if (typeof totalResults === 'number' && typeof perPage === 'string') {
  //   dispatch(setTotalPages(Math.ceil(totalResults / +perPage)));
  // }

  const handlePageChange = (value: number) => {
    dispatch(setCurrentPage(value));

    if (searchQuery) {
      router.push(`/?query=${searchQuery}&page=${value}&per_page=${itemsPerPage}`);
    } else {
      router.push(`/?page=${value}&per_page=${itemsPerPage}`);
    }
  };

  const handlePerPageChange = (value: number) => {
    dispatch(setItemsPerPage(value));
    dispatch(setCurrentPage(1));

    if (searchQuery) {
      router.push(`/?query=${searchQuery}&page=${currentPage}&per_page=${value}`);
    } else {
      router.push(`/?page=${currentPage}&per_page=${value}`);
    }
  };

  const handleSearch = (newQuery: string) => {
    dispatch(setSearchQuery(newQuery));

    if (newQuery !== searchQuery) {
      router.push(`/?query=${newQuery}&page=${currentPage}&per_page=${itemsPerPage}`);
    }
  };

  return (
    <div className="container">
      <Search onSearch={handleSearch} />
      <div className={styles.section}>
        <SearchResult searchResult={data} />
      </div>
      <div className={styles.footer}>
        <Select value={itemsPerPage} onChange={handlePerPageChange} />
        <Pagination onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Gallery;
