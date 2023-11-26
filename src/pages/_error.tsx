import { NextPageContext } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { Routes } from '@/lib/types/enums';
import styles from '@/styles/Page404.module.scss';

interface Props {
  statusCode?: number;
  message?: string;
}

const Error = ({ statusCode, message }: Props) => (
  <>
    <Head>
      <title>404 page</title>
    </Head>
    <div className={styles.root}>
      <h1 className={styles.title}>{statusCode || 'Error'}</h1>
      <p className={styles.subtitle}>{message || 'Sorry, something went wrong'}</p>
      <Link href={Routes.HOME}>
        <a className={styles.link}>Go to home page</a>
      </Link>
    </div>
  </>
);

export default Error;

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
