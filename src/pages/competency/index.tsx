import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';

export default function CompetenciesPage() {
  const { data: session, status } = useSession();
  return (
    <>
      <Sidebar>
        {status === 'authenticated' ? (
          <>
            <p>Welcome {session.user!.name}</p>
            <p>This is a Competencies page</p>
            <div></div>
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
