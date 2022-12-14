import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export default function MainProfile() {
  const { data: session, status } = useSession();
  return (
    <>
      <Sidebar>
        {status === 'authenticated' ? (
          <>
            <p>Welcome {session.user!.name}</p>
            <Link
              href="/profile/anton-efimov"
              className="border-b border-b-orange-500 text-orange-400"
            >
              Anton Efimov's profile
            </Link>
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
        destination: '/auth/signin',
      },
    };
  }
  return {
    props: { session },
  };
};
