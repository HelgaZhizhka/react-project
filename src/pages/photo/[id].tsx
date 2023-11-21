import Head from 'next/head';
import { useRouter } from 'next/router';

import { Details } from '@/components/Details';
import LayoutHome from '../layout';

const PageDetail = () => {
  const { id } = useRouter().query;

  return (
    <>
      <Head>
        <title>About | photo</title>
      </Head>
      <LayoutHome>
        <Details id={id} />
      </LayoutHome>
    </>
  );
};

export default PageDetail;
