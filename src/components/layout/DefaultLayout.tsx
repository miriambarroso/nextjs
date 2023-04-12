import { ReactNode } from 'react';
import Drawer from '@/components/layout/Drawer';
import Head from 'next/head';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import { NextPageWithLayout } from '@/pages/_app';
import { classNames } from '@/utils';

type Props = {
  children: ReactNode;
  page: NextPageWithLayout;
};
const DefaultLayout = ({ children, page }: Props) => {
  return (
    <Drawer className={'bg-base-100 drawer-end'}>
      <Head>
        <title>Vagas Anápolis - Recrutamento com Inteligência Artificial</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <main className={classNames(page.overrideLayout ?? 'container')}>
        {children}
      </main>
      <Footer />
    </Drawer>
  );
};

export default DefaultLayout;
