import Layout from '@/components/Layout';
import { useSession, signOut, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function Account() {
  const { data: session, status } = useSession();
  // if (status === 'authenticated') {
  return (
    <>
      <Head>
        <title>Step-Upp. A tool to help you advance you career</title>
      </Head>
      <Layout>
        {status === 'authenticated' ? (
          <>
            <p>Welcome {session.user!.name} </p>
          </>
        ) : (
          <p>You are not signed in</p>
        )}
      </Layout>
    </>
  );
}

export const getServerSideProps = async (context: GetServerSideProps) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
      },
    };
  }
  return {
    props: { session },
  };
};
