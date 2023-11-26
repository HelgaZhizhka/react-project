import Head from 'next/head';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Photo } from '@/lib/types/interfaces';
import { getPhoto } from '@/lib/services/apiService';
import { wrapper } from '@/lib/redux/store';
import { About } from '@/components/About';
import LayoutPage from '../layout';
import { fetchData } from '@/lib/helpers/fetchData';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const query = typeof context.query.query === 'string' ? context.query.query : '';
    const page = typeof context.query.page === 'string' ? parseInt(context.query.page) : 1;
    const per_page =
      typeof context.query.per_page === 'string' ? parseInt(context.query.per_page) : 10;

    const { id } = context.params || {};
    let photoData: Photo | null = null;

    if (id) {
      photoData = await store.dispatch(getPhoto.initiate(+id)).unwrap();
    }

    const data = await fetchData(store, query, page, per_page);

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
