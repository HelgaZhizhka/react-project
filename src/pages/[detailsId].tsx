import { Details } from '@/components/Details';
import { Main } from '@/components/Main';
import { useRouter } from 'next/router';

const PageWithDetails = () => {
  const router = useRouter();
  const { detailsId } = router.query;

  return (
    <>
      <Main />
      {detailsId && <Details id={detailsId} />}
    </>
  );
};

export default PageWithDetails;
