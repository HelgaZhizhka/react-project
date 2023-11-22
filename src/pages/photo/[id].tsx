import Head from 'next/head';
import { useRouter } from 'next/router';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { SearchResponse } from '@/utils/interfaces';
import { getPopularity, searchPhotos } from '@/lib/services/apiService';
import { wrapper } from '@/lib/redux/store';
import { Details } from '@/components/Details';
import LayoutPage from '@/pages/layout';

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

const PageDetail: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  photos,
}) => {
  const { id } = useRouter().query;

  return (
    <>
      <Head>
        <title>About | photo</title>
      </Head>
      <LayoutPage galleryData={photos}>
        <Details id={id} />
      </LayoutPage>
    </>
  );
};

export default PageDetail;
