import Sidebar from '@/components/Sidebar/Sidebar';
import { getSession } from 'next-auth/react';
import { siteDescription } from '@/data/data';
import React from 'react';
import prisma from '@/utils/prisma';
import { ProfileType } from '@/types/types';
import Card from '@/components/Card';

type Props = {
  profile: ProfileType;
};

export default function DesignPage({ profile }: Props) {
  return (
    <>
      <Sidebar name={profile.name}>
        <div>
          <h1 className="mb-4 text-2xl">Welcome to StepUpp</h1>
        </div>
        <Card>
          <h2 className="mb-2 text-xl">Card component</h2>
        </Card>
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
