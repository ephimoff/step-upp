import Sidebar from '@/components/Sidebar';
import ProfileCard from '@/components/Profile/ProfileCard';
import prisma from '@/utils/prisma';
import { getSession } from 'next-auth/react';
import React from 'react';
import CompetencyCard from '@/components/Competencies/CompetencyCard';
import Link from 'next/link';
import ProfileCompetenciesLoading from '@/components/Profile/ProfileCompetenciesLoading';

const ProfilePage = ({ profile, competencies, assignedCompetencies }: any) => {
  const title = profile
    ? `${profile.name}'s profile on StepUpp`
    : 'No profile was found';
  return (
    <>
      <Sidebar title={title}>
        {profile ? (
          <div className="">
            <ProfileCard
              name={profile.name}
              title={profile.title}
              team={profile.team}
              email={profile.email}
            />
            <ProfileCompetenciesLoading
              profile={profile}
              competencies={competencies}
            />

            <CompetencyCard
              competencies={assignedCompetencies}
              profileId={profile.id}
            />
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
    include: { competencies: true },
  });
  console.log(profile);

  let competencies: any = null;
  let assignedCompetencies: any = null;

  if (profile) {
    competencies = await prisma.competency.findMany({
      include: { skills: true },
    });

    assignedCompetencies = await prisma.profileCompetencies.findMany({
      where: {
        profileId: profile?.id,
      },
      select: {
        competency: {
          select: {
            id: true,
            name: true,
            skills: {
              select: {
                id: true,
                name: true,
                scores: { where: { profileId: profile.id } },
              },
            },
          },
        },
      },
    });

    const refreshCompetenciesList = () => {
      competencies.forEach(function (competency: any) {
        if (
          profile?.competencies.find(
            (element) => element.competencyId === competency.id
          )
        ) {
          competency.unavailable = true;
        } else {
          competency.unavailable = false;
        }
      });
    };

    refreshCompetenciesList();
  }

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }

  return {
    props: { session, profile, competencies, assignedCompetencies },
  };
};
