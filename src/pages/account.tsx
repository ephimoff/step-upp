import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar/Sidebar';
import prisma from '@/utils/prisma';
import { ProfileType } from '@/types/types';

type AccountPageProps = {
  profile: ProfileType;
};

export default function AccountPage({ profile }: AccountPageProps) {
  const { data: session, status } = useSession();
  return (
    <>
      <Sidebar name={profile.name}>
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
        destination: '/auth/signin',
      },
    };
  }
  const profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email as string,
    },
  });

  if (!profile) {
    return {
      redirect: {
        destination: '/myprofile',
      },
    };
  }

  return {
    props: { session, profile },
  };
};
