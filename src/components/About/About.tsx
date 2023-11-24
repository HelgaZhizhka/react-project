import { useRouter } from 'next/router';

import { Routes } from '@/utils/enums';
import { Button } from '@/components/Button';
import { Photo } from '@/utils/interfaces';
import { Card } from '@/components/Card';
import styles from './About.module.scss';

interface Props {
  photoData: Photo;
}

const About: React.FC<Props> = ({ photoData }) => {
  const router = useRouter();
  const query = typeof router.query.query === 'string' ? router.query.query : '';
  const page = typeof router.query.page === 'string' ? parseInt(router.query.page) : 1;
  const per_page = typeof router.query.per_page === 'string' ? parseInt(router.query.per_page) : 10;

  const handleClose = () => {
    if (query && query !== '') {
      router.push(`${Routes.HOME}?query=${query}&page=${page}&per_page=${per_page}`, undefined, {
        scroll: false,
      });
    } else {
      router.push(`${Routes.HOME}?page=${page}&per_page=${per_page}`, undefined, {
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
