// import { useAppSelector } from '@/hooks';
// import { useGetPhotoQuery } from '@/api/apiService';
// import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/Button';
// import { Card } from '@/components/Card';
import styles from './Details.module.scss';

interface Props {
  id: string | string[] | undefined;
}

const Details: React.FC<Props> = ({ id }) => {
  // const currentPage = useAppSelector((state) => state.pagination.currentPage);
  // const searchValue = useAppSelector((state) => state.search.query);

  // const { id } = useParams<{ id: string }>();
  // const { data: photo, isLoading, isError } = useGetPhotoQuery(id ? Number(id) : 0);

  // if (isLoading || isError || !photo)
  //   return (
  //     <aside className={styles.root}>
  //       <div className={styles.container} role="loader">
  //         <Spinner />
  //       </div>
  //     </aside>
  //   );

  // const handleCloseDetails = () => {
  //   if (searchValue) {
  //     navigate(`${RoutePaths.HOME}?query=${searchValue}&page=${currentPage}`, { replace: true });
  //   } else {
  //     navigate(`${RoutePaths.HOME}?page=${currentPage}`, { replace: true });
  //   }
  // };

  return (
    <aside className={styles.root}>
      <div className={styles.container}>
        <Button className={styles.close}>Close</Button>
        <h2>Detailed page {id}</h2>
        {/* <Card {...photo} isDetailed={true} /> */}
      </div>
    </aside>
  );
};

export default Details;
