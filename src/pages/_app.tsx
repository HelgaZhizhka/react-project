import type { AppProps } from 'next/app';

import { Providers } from '@/lib/providers';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import '@/styles/index.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <ErrorBoundary>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ErrorBoundary>
    </Providers>
  );
};

export default App;
