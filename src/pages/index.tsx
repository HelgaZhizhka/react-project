import Head from 'next/head';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { SearchResponse } from '@/utils/interfaces';
import { getPopularity, searchPhotos } from '@/lib/services/apiService';
import { wrapper } from '@/lib/redux/store';

import LayoutPage from './layout';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const query = context.query?.query as string | undefined;
    const page = parseInt(context.query?.page as string) || 1;
    const perPage = parseInt(context.query?.perPage as string) || 10;

    let data: SearchResponse | undefined;

    if (query) {
      data = await store.dispatch(searchPhotos.initiate({ query, page, perPage })).unwrap();
    } else {
      data = await store.dispatch(getPopularity.initiate({ page, perPage })).unwrap();
    }

    if (!data) {
      return { notFound: true };
    }

    return { props: { photos: data.photos } };
  }
);

const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ photos }) => {
  return (
    <>
      <Head>
        <title>Photo gallery</title>
      </Head>
      <LayoutPage galleryData={photos} />
    </>
  );
};

export default Home;
