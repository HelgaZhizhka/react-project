import { NextPageContext } from 'next';
import Head from 'next/head';

import styles from '@/styles/Page404.module.scss';
import { Button } from '@/components/Button';

interface Props {
  statusCode?: number;
  message?: string;
}

const Error = ({ statusCode, message }: Props) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <Head>
        <title>Error page</title>
      </Head>
      <div className={styles.error}>
        <h4>Oops! Something went wrong...</h4>
        <p>We encountered a problem trying to display this section.</p>
        <p>Please try refreshing the page or come back later.</p>
        <details className={styles.details}>
          <p>{statusCode || 'Error'}</p>
          <p>{message}</p>
        </details>
        <Button onClick={handleReload}>Reload App</Button>
      </div>
    </>
  );
};

export default Error;

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
