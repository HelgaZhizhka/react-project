import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Photo } from '@/utils/interfaces';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setCurrentPage, setTotalPages } from '@/lib/redux/slices/pagination/paginationSlice';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { Select } from '@/components/Select';
import { SearchResult } from '@/components/SearchResult';
import styles from './Gallery.module.scss';
import { setSearchQuery } from '@/lib/redux/slices/search/searchSlice';
import { setItemsPerPage } from '@/lib/redux/slices/itemsPerPage/itemsPerPageSlice';

interface Props {
  galleryData: Photo[] | undefined;
  totalResults?: number;
}

const Gallery: React.FC<Props> = ({ galleryData, totalResults }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.query);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const perPage = useAppSelector((state) => state.itemsPerPage.value);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));

    if (searchQuery) {
      router.push(`/?query=${searchQuery}&page=${page}&per_page=${perPage}`);
    } else {
      router.push(`/?page=${page}&per_page=${perPage}`);
    }
  };

  const handlePerPageChange = (value: number) => {
    dispatch(setItemsPerPage(value));
    dispatch(setCurrentPage(1));

    if (searchQuery) {
      router.push(`/?query=${searchQuery}&page=${currentPage}&per_page=${perPage}`);
    } else {
      router.push(`/?page=${currentPage}&per_page=${perPage}`);
    }
  };

  const handleSearch = (query: string) => {
    if (query !== searchQuery) {
      router.push(`/?query=${query}&page=${currentPage}&per_page=${perPage}`);
      dispatch(setSearchQuery(query));
    }
  };

  useEffect(() => {
    if (totalResults !== undefined) {
      dispatch(setTotalPages(Math.ceil(totalResults / perPage)));
    }
  }, [totalResults, dispatch, perPage]);

  return (
    <div className="container">
      <Search onSearch={handleSearch} />
      <div className={styles.section}>
        <SearchResult searchResult={galleryData} />
      </div>
      <div className={styles.footer}>
        <Select value={perPage} onChange={handlePerPageChange} />
        <Pagination onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Gallery;
