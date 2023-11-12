import { Suspense } from 'react';
import {
  useNavigate,
  useSearchParams,
  useLoaderData,
  LoaderFunction,
  defer,
  Await,
} from 'react-router-dom';

import { apiGetPhoto } from '@/api/api';
import { Photo } from '@/utils/interfaces';
import { RoutePaths } from '@/routes/routes.enum';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import styles from './Details.module.scss';

export const detailsLoader: LoaderFunction = async ({ params }) => {
  if (!params.id) {
    return;
  }
  return defer({
    photo: apiGetPhoto(+params.id),
  });
};

const Details: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const data = useLoaderData() as { photo: Photo };

  const handleCloseDetails = () => {
    const page = searchParams.get('page');
    navigate(`${RoutePaths.HOME}?page=${page}`, { replace: true });
  };

  return (
    <aside className={styles.root}>
      <Suspense fallback={<Spinner />}>
        <Await resolve={data.photo}>
          {(resolvedPhoto) => (
            <div className={styles.container}>
              <Button className={styles.close} onClick={handleCloseDetails}>
                Close
              </Button>
              <Card {...resolvedPhoto} isDetailed={true} />
            </div>
          )}
        </Await>
      </Suspense>
    </aside>
  );
};

export default Details;
