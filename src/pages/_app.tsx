import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { wrapper } from '@/lib/redux/store';
import { Layout } from '@/components/Layout';
import '@/styles/index.scss';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
