import type { MembershipType, ProfileType } from '@/types/types';
import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { log } from 'next-axiom';
import Sidebar from '@/components/Sidebar/Sidebar';
import React from 'react';
import prisma from '@/utils/prisma';

type Props = {
  profile: ProfileType;
  membership: MembershipType[];
};

const MyProfilePage = ({ profile, membership }: Props) => {
  const role = membership[0].role;
  return (
    <>
      <Sidebar name={profile.name} role={role}>
        {profile.slug}
      </Sidebar>
    </>
  );
};
export default MyProfilePage;

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);
  const PAGE = 'MyProfile';

  if (!session) {
    log.warn(`${PAGE} page - Session not found. Redirecting to /auth/signin`);
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }
  log.info(`${PAGE} page - Session found`);
  log.debug(`${PAGE} page - Session: `, session);

  let profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email as string,
    },
    include: {
      user: {
        include: {
          membership: true,
        },
      },
    },
  });

  if (!profile) {
    log.warn(`${PAGE} page - Profile not found. Redirecting to /account`);
    return {
      redirect: {
        destination: '/account',
      },
    };
  } else {
    log.info(`${PAGE} page - Profile found. Redirecting to /profile/:slug`);

    return {
      redirect: {
        destination: `/profile/${profile.slug}`,
      },
    };
  }
  let membership = profile!.user.membership;
  log.info(`${PAGE} page - Profile found`);
  log.debug(`${PAGE} page - Profile: `, profile as { [key: string]: any });

  // a hack to deal with the serialising the date objects
  profile = JSON.parse(JSON.stringify(profile));
  membership = JSON.parse(JSON.stringify(membership));
  return {
    props: { session, profile, membership },
  };
};
