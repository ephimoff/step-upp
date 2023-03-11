import Sidebar from '@/components/Sidebar/Sidebar';
import { getSession } from 'next-auth/react';
import React from 'react';
import prisma from '@/utils/prisma';
import type { ProfileType } from '@/types/types';

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

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  // const session = await getServerSession(context.req, context.res, authOptions);
  // console.log('===session:');
  // console.dir(session);

  if (!session) {
    console.info(
      'MyProfile page - Session not found. Redirecting to /auth/signin'
    );
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }
  console.info('MyProfile page - Session found: ', session);

  const profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email as string,
    },
  });

  if (!profile) {
    console.info('MyProfile page - Profile not found. Redirecting to /account');
    return {
      redirect: {
        destination: '/account',
      },
    };
  } else {
    console.info(
      'MyProfile page - Profile found. Redirecting to /myaccount/:slug'
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
