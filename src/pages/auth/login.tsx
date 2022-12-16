// import Layout from '@/components/Layout';
import { GetServerSideProps } from 'next';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <p>Signed in as {session.user!.name} </p>
        <button className="mx-2 rounded border px-4" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div>
      <p>Not signed in </p>
      <button className="mx-2 rounded border px-4" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSideProps) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }
  return {
    props: { session },
  };
};
