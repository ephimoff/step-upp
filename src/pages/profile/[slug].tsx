import Sidebar from '@/components/Sidebar';
import ProfileCard from '@/components/Profile/ProfileCard';
import prisma from '@/utils/prisma';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import CompetencyCard from '@/components/Competencies/CompetencyCard';
import Link from 'next/link';
import ProfileCompetenciesLoading from '@/components/Profile/ProfileCompetenciesLoading';
import { CompetencyType, ProfileType } from '@/types/types';
import Spinner from '@/components/Spinner';

type ProfilePageProps = {
  competencies: any;
  profile: ProfileType;
};

const ProfilePage = ({ profile, competencies }: ProfilePageProps) => {
  const title = profile
    ? `${profile.name}'s profile on StepUpp`
    : 'No profile was found';

  const [assignedCompetencies, setAssignedCompetencies] = useState<
    CompetencyType[] | []
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAssignedCompetencies = async () => {
    try {
      const res = await fetch(`/api/assigncompetency?profileId=${profile.id}`);
      const resJson: CompetencyType[] = await res.json();
      if (res.status === 200) {
        setAssignedCompetencies(resJson);
      } else {
        setAssignedCompetencies([]);
      }
    } catch (e: any) {
      setError(e);
    } finally {
      () => setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedCompetencies();
  }, []);

  return (
    <>
      <Sidebar title={title} name={profile.name}>
        {profile ? (
          <div className="">
            <ProfileCard
              name={profile.name}
              title={profile.title}
              team={profile.team}
              email={profile.email}
              userpic={profile.userpic}
            />
            <ProfileCompetenciesLoading
              profile={profile}
              competencies={competencies}
              fetchAssignedCompetencies={fetchAssignedCompetencies}
            />
            {error && <div className="bg-red-500 text-white">{error}</div>}
            {loading ? (
              <Spinner />
            ) : (
              assignedCompetencies.map(({ competency }: any, index: number) => {
                return (
                  <div key={index}>
                    <CompetencyCard
                      competency={competency}
                      profileId={profile.id}
                    />
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div>
            <h2>No profile with such slug is found</h2>
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

  let competencies: any = null;

  if (profile) {
    competencies = await prisma.competency.findMany({
      include: { skills: true },
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
    props: { session, profile, competencies },
  };
};
