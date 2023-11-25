import { useRouter } from 'next/router';

import { Routes } from '@/utils/enums';
import { Button } from '@/components/Button';
import { Photo } from '@/utils/interfaces';
import { Card } from '@/components/Card';
import styles from './About.module.scss';
import { currentPage, defaultPerPage } from '@/utils/constants';

type Props = {
  photoData: Photo;
};

const About: React.FC<Props> = ({ photoData }) => {
  const router = useRouter();
  const { query = '', page = currentPage, per_page = defaultPerPage } = router.query;

  const handleClose = () => {
    if (query) {
      router.push(`${Routes.HOME}?query=${query}&page=${page}&per_page=${per_page}`);
    } else {
      router.push(`${Routes.HOME}?page=${page}&per_page=${per_page}`);
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
