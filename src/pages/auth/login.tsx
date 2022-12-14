import Layout from '@/components/Layout';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Layout>
        <p>Signed in as {session.user!.name} </p>
        <button className="mx-2 rounded border px-4" onClick={() => signOut()}>
          Sign out
        </button>
      </Layout>
    );
  }
  return (
    <Layout>
      <p>Not signed in </p>
      <button className="mx-2 rounded border px-4" onClick={() => signIn()}>
        Sign in
      </button>
    </Layout>
  );
}
