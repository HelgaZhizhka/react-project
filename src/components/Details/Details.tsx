import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { apiGetPhoto } from '@/api/api';
import { Photo } from '@/utils/interfaces';
import { RoutePaths } from '@/routes/routes.enum';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import styles from './Details.module.scss';

const Details: React.FC = () => {
  const [details, setDetails] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();

  const handleCloseDetails = () => {
    setDetails(null);
    const page = searchParams.get('page');
    navigate(`${RoutePaths.HOME}?page=${page}`);
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchDetails = async (id: number) => {
      try {
        setLoading(true);
        const data = await apiGetPhoto(id);
        setDetails(data);
      } catch (error) {
        console.error('Failed to load details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails(Number(id));
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!details) {
    return null;
  }

  return (
    <aside className={styles.root}>
      <div className={styles.container}>
        <Button onClick={handleCloseDetails}>Close</Button>
        <Card {...details} isDetailed={true} />
      </div>
    </aside>
  );
};

export default Details;
