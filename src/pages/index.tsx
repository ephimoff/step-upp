import Sidebar from '@/components/Sidebar';
import { getSession } from 'next-auth/react';
import { siteDescription } from '@/data/data';
import React, { useEffect } from 'react';
import prisma from '@/utils/prisma';
import { UserType } from '@/types/types';
import { useUser } from '@/contexts/global.context';

type HomePageProps = {
  user: UserType;
};

export default function HomePage({ user }: HomePageProps) {
  const { currentUser, setCurrentUser } = useUser();
  useEffect(() => {
    setCurrentUser(user);
  }, []);
  console.log('currentUser', currentUser);
  return (
    <>
      <Sidebar>
        <div>
          <h1>Welcome to StepUpp</h1>
          <p>{siteDescription}</p>
        </div>
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
  const user = await prisma.user.findUnique({
    where: {
      email: session!.user!.email as string,
    },
    include: {
      profile: { include: { competencies: true, skills: true } },
    },
  });
  console.dir(user, { depth: null });

  // const profile = await prisma.profile.findUnique({
  //   where: {
  //     email: session!.user!.email as string,
  //   },
  // });

  if (!user?.profile) {
    return {
      redirect: {
        destination: '/myprofile',
      },
    };
  }

  return {
    props: { session, user },
  };
};
