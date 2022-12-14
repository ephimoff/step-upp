import Layout from '@/components/Layout';
import { useSession, signOut, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

export default function Account() {
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    return (
      <Layout>
        <p>Welcome {session.user!.name} </p>
        <button className="mx-2 rounded border px-4" onClick={() => signOut()}>
          Sign out
        </button>
      </Layout>
    );
  }
  return (
    <Layout>
      <p>You are not signed in</p>
    </Layout>
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
