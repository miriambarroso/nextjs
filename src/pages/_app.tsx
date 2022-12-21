import type { AppProps } from 'next/app';
import Layout from '@/components/layout';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import '@/styles/global.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
};

export default App;
