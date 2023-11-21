import Head from 'next/head';

import LayoutHome from './layout';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Photo gallery</title>
      </Head>
      <LayoutHome />
    </>
  );
};

export default Home;
