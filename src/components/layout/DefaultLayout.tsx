import Head from 'next/head';
import { ReactNode } from 'react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

type Props = {
  children: ReactNode;
};
const DefaultLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-base-100 drawer drawer-end">
      <Head>
        <title>Next.js + TypeScript Example</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <input id="drawer-navbar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar />
        <main className="container ">{children}</main>
        <Footer />
      </div>
      <div className="drawer-side">
        <label htmlFor="drawer-navbar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DefaultLayout;
