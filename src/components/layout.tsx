import Head from 'next/head';
import { ReactNode } from 'react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-base-100">
      <Head>
        <title>Next.js + TypeScript Example</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
