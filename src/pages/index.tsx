import type { ProfileType, MembershipType } from '@/types/types';
import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { siteDescription } from '@/data/data';
import Sidebar from '@/components/Sidebar/Sidebar';
import prisma from '@/utils/prisma';
import Card from '@/components/Card';
// import { getSession } from 'next-auth/react';
// import React from 'react';

type Props = {
  profile: ProfileType;
  membership: MembershipType[];
};

export default function HomePage({ profile, membership }: Props) {
  const role = membership[0].role;
  return (
    <>
      <Sidebar name={profile.name} role={role}>
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
    console.info(`${PAGE} page - Profile not found. Redirecting to /account`);
    return {
      redirect: {
        destination: '/account',
      },
    };
  }
  const membership = profile.user.membership;
  console.info(`${PAGE} page - Profile found`);
  console.debug(`${PAGE} page - Profile: `, profile);

  // a hack to deal with the serialising the date objects
  profile = JSON.parse(JSON.stringify(profile));
  return {
    props: { session, profile, membership },
  };
};
