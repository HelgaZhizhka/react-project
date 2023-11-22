import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import { Routes } from '@/utils/enums';
import { DELAY } from '@/utils/constants';
import styles from '@/styles/Page404.module.scss';

const Page404: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(Routes.HOME);
    }, DELAY);
  }, [router]);

  return (
    <>
      <Head>
        <title>404 page</title>
      </Head>
      <div className={styles.root}>
        <h2 className={styles.title}>404</h2>
        <p className={styles.subtitle}>Sorry, there&apos;s nothing here 🥲</p>
        <Link className={styles.link} href={Routes.HOME}>
          Go to home page
        </Link>
      </div>
    </>
  );
};

export default Page404;
