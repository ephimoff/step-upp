import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import Head from 'next/head';

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
    <>
      <Head>
        <title>Step-Upp. A tool to help you advance you career</title>
      </Head>

      <div className="bg-gradient-to-r from-cyan-500 to-fuchsia-500">
        <div className="flex h-screen items-center justify-center">
          <div className="rounded-xl bg-sky-400 p-10 shadow-xl">
            <p>Not signed in </p>
            <button
              className="mx-2 rounded border px-4"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
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
