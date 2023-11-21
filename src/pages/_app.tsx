import type { AppProps } from 'next/app';

import { wrapper } from '@/lib/redux/store';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import '@/styles/index.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ErrorBoundary>
);

export default wrapper.withRedux(App);
