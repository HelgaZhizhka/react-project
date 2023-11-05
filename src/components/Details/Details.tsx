import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { apiGetPhoto } from '../../api/api';
import { Photo } from '../../utils/interfaces';
import { Spinner } from '../Spinner';
import { Button } from '../Button';
import { Card } from '../Card';
import styles from './Details.module.scss';

const Details: React.FC = () => {
  const [details, setDetails] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleCloseDetails = () => {
    setDetails(null);
    navigate('/');
  };

  useEffect(() => {
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

    const detailsId = Number(id);
    if (detailsId) {
      fetchDetails(detailsId);
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!details) {
    return null;
  }

  return (
    <div className="container">
      <Button onClick={handleCloseDetails}>Close</Button>
      <div className={styles.root}>
        <Card {...details} isDetailed={true} />
      </div>
    </div>
  );
};

export default Details;
