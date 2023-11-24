import Head from 'next/head';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Photo, SearchResponse } from '@/utils/interfaces';
import { getPhoto, getPopularity, searchPhotos } from '@/lib/services/apiService';
import { wrapper } from '@/lib/redux/store';
import { About } from '@/components/About';
import LayoutPage from '../layout';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { query, page = 1, perPage = 10 } = context.query;
    const { id } = context.params || {};
    let photoData: Photo | null = null;

    if (id) {
      photoData = await store.dispatch(getPhoto.initiate(+id)).unwrap();
    }

    let data: SearchResponse | null = null;

    if (query) {
      data = await store.dispatch(searchPhotos.initiate({ query, page, perPage })).unwrap();
    } else {
      data = await store.dispatch(getPopularity.initiate({ page, perPage })).unwrap();
    }

    if (!data || !photoData) {
      return { notFound: true };
    }

    return {
      props: { photoData: photoData, photos: data.photos, totalResults: data.total_results },
    };
  }
);

const AboutPage: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  photoData,
  photos,
  totalResults,
}) => {
  return (
    <>
      <Head>
        <title>About | photo</title>
      </Head>
      <LayoutPage photos={photos} totalResults={totalResults}>
        <About photoData={photoData} />
      </LayoutPage>
    </>
  );
};

export default AboutPage;
