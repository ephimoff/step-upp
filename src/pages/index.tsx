import Sidebar from '@/components/Sidebar';
import { getSession } from 'next-auth/react';
import { siteDescription } from '@/data/data';
import React from 'react';
import prisma from '@/utils/prisma';

export default function HomePage() {
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
