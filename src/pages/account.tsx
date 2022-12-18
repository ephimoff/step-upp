import { useSession, getSession } from 'next-auth/react';
import Head from 'next/head';
import Sidebar from '@/components/Sidebar';

export default function Account() {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>Step-Upp. A tool to help you advance you career</title>
      </Head>
      <Sidebar>
        {status === 'authenticated' ? (
          <>
            <p>Welcome {session.user!.name}</p>
            <p>This is an Account page</p>
          </>
        ) : (
          <p>You are not signed in</p>
        )}
      </Sidebar>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
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
