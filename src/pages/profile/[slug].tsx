import ProgressBar from '@/components/ProgressBar';
import Sidebar from '@/components/Sidebar';
import UserInfo from '@/components/UserInfo';
import { dataFull, dataEmpty } from '@/data/data';
import prisma from '@/utils/prisma';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import CompetencyCard from '@/components/CompetencyCard';

const ProfilePage = ({ profile }: any) => {
  const router = useRouter();
  return (
    <>
      <Sidebar title={`${profile.name}'s profile on StepUpp`}>
        {router.isFallback ? <div>Loading...</div> : null}
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
          <div>A profile with such slug doesn't exist</div>
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
