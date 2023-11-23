import Head from 'next/head';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { SearchResponse } from '@/utils/interfaces';
import { getPopularity, searchPhotos } from '@/lib/services/apiService';
import { wrapper } from '@/lib/redux/store';
import { Spinner } from '@/components/Spinner';

import LayoutPage from './layout';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { query, page = 1, perPage = 10 } = context.query;
    let data: SearchResponse | undefined;

    if (query) {
      data = await store.dispatch(searchPhotos.initiate({ query, page, perPage })).unwrap();
    } else {
      data = await store.dispatch(getPopularity.initiate({ page, perPage })).unwrap();
    }

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
  if (!photos) {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <title>Photo gallery</title>
      </Head>
      <LayoutPage galleryData={photos} totalResults={totalResults} />
    </>
  );
};

export default Home;
