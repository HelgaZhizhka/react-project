import { useRouter } from 'next/router';

import { Routes } from '@/utils/enums';
import { useAppSelector } from '@/lib/redux/hooks';
import { Button } from '@/components/Button';
import { Photo } from '@/utils/interfaces';
import { Card } from '@/components/Card';
import styles from './About.module.scss';

interface Props {
  photoData: Photo;
}

const About: React.FC<Props> = ({ photoData }) => {
  const router = useRouter();
  const searchQuery = useAppSelector((state) => state.search.query);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const itemsPerPage = useAppSelector((state) => state.itemsPerPage.perPage);

  const handleClose = () => {
    if (searchQuery) {
      router.push(
        `${Routes.HOME}?query=${searchQuery}&page=${currentPage}&per_page=${itemsPerPage}`,
        undefined,
        {
          scroll: false,
        }
      );
    } else {
      router.push(`${Routes.HOME}?page=${currentPage}&per_page=${itemsPerPage}`, undefined, {
        scroll: false,
      });
    }
  };

  return (
    <aside className={styles.root}>
      <div className={styles.container}>
        <Button className={styles.close} onClick={handleClose}>
          Close
        </Button>
        <Card {...photoData} isDetailed={true} />
      </div>
    </aside>
  );
};

export default About;
