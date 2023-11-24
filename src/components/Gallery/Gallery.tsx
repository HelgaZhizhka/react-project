import { useRouter } from 'next/router';

import { Photo } from '@/utils/interfaces';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { Select } from '@/components/Select';
import { SearchResult } from '@/components/SearchResult';

import styles from '@/styles/Gallery.module.scss';
import { NotFound } from '../NotFound';

interface Props {
  photos: Photo[];
  totalResults: number;
}

const Gallery: React.FC<Props> = ({ photos, totalResults }) => {
  const router = useRouter();
  const query = typeof router.query.query === 'string' ? router.query.query : '';
  const page = typeof router.query.page === 'string' ? parseInt(router.query.page) : 1;
  const per_page = typeof router.query.per_page === 'string' ? parseInt(router.query.per_page) : 10;

  const totalPages = Math.floor(totalResults / per_page);

  const handlePageChange = (value: number) => {
    if (query && query !== '') {
      router.push(`/?query=${query}&page=${value}&per_page=${per_page}`);
    } else {
      router.push(`/?page=${value}&per_page=${per_page}`);
    }
  };

  const handlePerPageChange = (value: number) => {
    if (query && query !== '') {
      router.push(`/?query=${query}&page=${page}&per_page=${value}`);
    } else {
      router.push(`/?page=${page}&per_page=${value}`);
    }
  };

  const handleSearch = (newQuery: string) => {
    if (newQuery !== query) {
      if (newQuery) {
        router.push(`/?query=${newQuery}&page=${page}&per_page=${per_page}`);
      } else {
        router.push(`/?page=${page}&per_page=${per_page}`);
      }
    }
  };

  return (
    <div className="container">
      <Search onSearch={handleSearch} />
      <div className={styles.section}>
        {!photos.length ? <NotFound /> : <SearchResult searchResult={photos} />}
      </div>
      <div className={styles.footer}>
        <Select value={per_page} onChange={handlePerPageChange} />
        <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Gallery;
