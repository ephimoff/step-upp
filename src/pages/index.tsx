import Sidebar from '@/components/Sidebar/Sidebar';
import { getSession } from 'next-auth/react';
import { siteDescription } from '@/data/data';
import React from 'react';
import prisma from '@/utils/prisma';
import { ProfileType } from '@/types/types';
import Card from '@/components/Card';

type HomePageProps = {
  profile: ProfileType;
};

export default function HomePage({ profile }: HomePageProps) {
  return (
    <>
      <Sidebar name={profile.name}>
        <div>
          <h1 className="mb-4 text-2xl">Welcome to StepUpp</h1>
          <p>{siteDescription}</p>
        </div>
        <Card>
          <h2 className="mb-2 text-xl">Quick actions</h2>
          <ul>
            <li>one</li>
            <li>two</li>
            <li>three</li>
          </ul>
        </Card>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (!session) {
    console.info('Home page - Session not found. Redirecting to /auth/signin');
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }
  console.info('Home page - Session found: ', !!session);
  console.log('Home page - Session', session);

  const profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email as string,
    },
  });

  if (!profile) {
    console.info('Home page - Profile not found. Redirecting to /myprofile');
    return {
      redirect: {
        destination: '/myprofile',
      },
    };
  }
  console.info('Home page - Profile found: ', !!profile);
  console.log('Home page - Profile', profile);

  return {
    props: { session, profile },
  };
};
