import { useRouter } from 'next/router';

import { Photo } from '@/types/interfaces';
import { defaultPerPage } from '@/utils/constants';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { Select } from '@/components/Select';
import { SearchResult } from '@/components/SearchResult';
import { NotFound } from '../NotFound';
import styles from '@/styles/Gallery.module.scss';

type Props = {
  photos: Photo[];
  totalResults: number;
};

const Gallery: React.FC<Props> = ({ photos, totalResults }) => {
  const router = useRouter();
  const { per_page = defaultPerPage } = router.query;
  const totalPages = Math.floor(totalResults / +per_page);

  return (
    <div className="container">
      <Search />
      <div className={styles.section}>
        {photos?.length > 0 ? <SearchResult photos={photos} /> : <NotFound />}
      </div>
      <div className={styles.footer}>
        <Select value={+per_page} />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Gallery;
