import type { AppProps } from 'next/app';
import DefaultLayout from '@/components/layout/DefaultLayout';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import '@/styles/global.scss';
import { Toaster } from 'react-hot-toast';
import RouteGuard from '@/components/RouteGuard';
import useScrollToTop from '@/hooks/useScrollToTop';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  permissions?: number[];
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  useScrollToTop();

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <DefaultLayout>
        <RouteGuard pageComponent={Component}>{page}</RouteGuard>
      </DefaultLayout>
    ));

  return getLayout(
    <>
      <div id="scroll" />
      <Component {...pageProps} />
      <Toaster />
    </>,
  );
};

export default App;
