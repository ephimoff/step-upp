import Sidebar from '@/components/Sidebar/Sidebar';
import { getSession } from 'next-auth/react';
import React from 'react';
import prisma from '@/utils/prisma';
import type { ProfileType } from '@/types/types';
import type { GetServerSidePropsContext } from 'next';

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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const PAGE = 'MyProfile';
  const session = await getSession(context);

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
  console.info(`${PAGE} page - Session found: `, session);

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
  console.info('MyProfile page - Profile found: ', profile);

  return {
    props: { session, profile },
  };
};
