import type { ProfileType } from '@/types/types';
import type { GetServerSidePropsContext } from 'next';
// import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { siteDescription } from '@/data/data';
import Sidebar from '@/components/Sidebar/Sidebar';
import React from 'react';
import prisma from '@/utils/prisma';
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

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  // const session = await getSession(context);
  const session = await getServerSession(req, res, authOptions);
  const PAGE = 'Home';

  if (!session) {
    console.info(
      `${PAGE} page - Session not found. Redirecting to /auth/signin`
    );
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }
  console.info(`${PAGE} page - Session found`);
  console.debug(`${PAGE} page - Session: `, session);

  const profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email as string,
    },
  });

  if (!profile) {
    console.info(`${PAGE} page - Profile not found. Redirecting to /account`);
    return {
      redirect: {
        destination: '/account',
      },
    };
  }
  console.info(`${PAGE} page - Profile found`);
  console.debug(`${PAGE} page - Profile: `, profile);

  return {
    props: { session, profile },
  };
};
