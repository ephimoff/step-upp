import ProgressBar from '@/components/ProgressBar';
import Sidebar from '@/components/Sidebar';
import UserInfo from '@/components/UserInfo';
import { dataFull, dataEmpty } from '@/data/data';
import prisma from '@/utils/prisma';
import { getSession } from 'next-auth/react';

import React from 'react';
import CompetencyCard from '@/components/CompetencyCard';
import Link from 'next/link';

const ProfilePage = ({ profile }: any) => {
  const title = profile
    ? `${profile.name}'s profile on StepUpp`
    : 'No profile was found';
  return (
    <>
      <Sidebar title={title}>
        {profile ? (
          <div className="h-max">
            <UserInfo
              name={profile.name}
              title={profile.title}
              team={profile.team}
              email={profile.email}
            />
            <CompetencyCard competencies={dataFull} />
          </div>
        ) : (
          <div>
            <h2>No competency with such is found</h2>
            <ul>
              <li>
                <Link
                  href="/"
                  className="border-b border-b-orange-500 text-orange-400"
                >
                  Go back home
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="border-b border-b-orange-500 text-orange-400"
                >
                  Go back to the list of profiles
                </Link>
              </li>
            </ul>
          </div>
        )}
      </Sidebar>
    </>
  );
};
export default ProfilePage;

export const getServerSideProps = async (context: any) => {
  const slug = context.query.slug.toLowerCase();
  const profile = await prisma.profile.findUnique({
    where: {
      slug: slug,
    },
  });

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }

  return {
    props: { session, profile },
  };
};
