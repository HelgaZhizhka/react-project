import Head from 'next/head';
import { Work_Sans } from 'next/font/google';

const work = Work_Sans({ subsets: ['latin'] });

const Home = () => (
  <>
    <Head>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <title>Photo gallery</title>
      <meta name="description" content="Photo gallery from pexels.com" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <main className={work.className}>
      <h1>Main Page</h1>
    </main>
  </>
);

export default Home;
