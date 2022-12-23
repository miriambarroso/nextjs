import { ReactNode } from 'react';
import Drawer from '@/components/layout/Drawer';
import Head from 'next/head';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

type Props = {
  children: ReactNode;
};
const DefaultLayout = ({ children }: Props) => {
  return (
    <Drawer className={'bg-base-100 drawer-end'}>
      <Head>
        <title>Next.js + TypeScript Example</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <main className="container ">{children}</main>
      <Footer />
    </Drawer>
  );
};

export default DefaultLayout;
