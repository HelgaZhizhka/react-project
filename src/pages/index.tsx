import Head from 'next/head';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { currentPage, defaultPerPage } from '@/lib/types/constants';
import { wrapper } from '@/lib/redux/store';
import { fetchData } from '@/lib/helpers/fetchData';

import LayoutPage from './layout';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const query = typeof context.query.query === 'string' ? context.query.query : '';
    const page =
      typeof context.query.page === 'string' ? parseInt(context.query.page) : currentPage;
    const per_page =
      typeof context.query.per_page === 'string'
        ? parseInt(context.query.per_page)
        : defaultPerPage;

    const data = await fetchData(store, query, page, per_page);

    if (!data) {
      return { notFound: true };
    }

    return { props: { photos: data.photos, totalResults: data.total_results } };
  }
);

const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  photos,
  totalResults,
}) => {
  return (
    <>
      <Head>
        <title>Photo gallery</title>
      </Head>
      <LayoutPage photos={photos} totalResults={totalResults} />
    </>
  );
};

export default Home;
