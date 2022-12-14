import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

const description = 'Generic description variable';
export const siteTitle = 'Generic description title';

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <Sidebar children={children} />
    </>
  );
}
