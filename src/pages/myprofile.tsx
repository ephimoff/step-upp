import type { ProfileType } from '@/types/types';
import type { GetServerSidePropsContext } from 'next';
// import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Sidebar from '@/components/Sidebar/Sidebar';
import React from 'react';
import prisma from '@/utils/prisma';

type Props = {
  profile: ProfileType;
};

const MyProfilePage = ({ profile }: Props) => {
  return (
    <>
      <Sidebar name={profile.name}>{profile.slug}</Sidebar>
    </>
  );
};
export default MyProfilePage;

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  // const session = await getSession(context);
  const session = await getServerSession(req, res, authOptions);
  const PAGE = 'MyProfile';

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
  } else {
    console.info(
      `${PAGE} page - Profile found. Redirecting to /myaccount/:slug`
    );
    return {
      redirect: {
        destination: `/profile/${profile.slug}`,
      },
    };
  }
  console.info(`${PAGE} page - Profile found`);
  console.debug(`${PAGE} page - Profile: `, profile);

  return {
    props: { session, profile },
  };
};
