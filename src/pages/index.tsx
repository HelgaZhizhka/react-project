import Head from 'next/head';
import { Main } from '@/components/Main';

const Home = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>Photo gallery</title>
        <meta name="description" content="Photo gallery from pexels.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Main />
    </>
  );
};

export default Home;
