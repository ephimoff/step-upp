import Sidebar from '@/components/Sidebar/Sidebar';
import ProfileCard from '@/components/Profile/ProfileCard';
import prisma from '@/utils/prisma';
import { getSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import CompetencyCard from '@/components/Competencies/CompetencyCard';
import Link from 'next/link';
import ProfileCompetenciesLoading from '@/components/Profile/ProfileCompetenciesLoading';
import { CompetencyType, ProfileType } from '@/types/types';
import Spinner from '@/components/Spinner';

type Props = {
  competencies: any;
  profile: ProfileType;
  slugProfile: ProfileType;
  isSameProfile: boolean;
  slug: string;
};

const ProfilePage = ({
  profile,
  slugProfile,
  competencies,
  isSameProfile,
  slug,
}: Props) => {
  const profileName = profile ? profile.name : '';
  // console.log('isSameProfile', isSameProfile);

  const title = slugProfile
    ? `${slugProfile.name}'s profile on StepUpp`
    : 'No profile was found';

  const [assignedCompetencies, setAssignedCompetencies] = useState<
    CompetencyType[] | []
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAssignedCompetencies = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/assigncompetency?profileId=${slugProfile.id}`
      );
      const resJson: CompetencyType[] = await res.json();
      // console.dir(resJson, { depth: null });
      if (res.status === 200) {
        setAssignedCompetencies(resJson);
      } else {
        setAssignedCompetencies([]);
      }
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [slugProfile]);

  useEffect(() => {
    fetchAssignedCompetencies();
  }, [fetchAssignedCompetencies]);

  return (
    <>
      <Sidebar title={title} name={profileName}>
        {slugProfile ? (
          <div className="">
            <ProfileCard
              name={slugProfile.name}
              title={slugProfile.title}
              team={slugProfile.team}
              email={slugProfile.email}
              userpic={slugProfile.userpic}
              isSameProfile={isSameProfile}
            />
            <ProfileCompetenciesLoading
              profile={slugProfile}
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
                      profileId={slugProfile.id}
                      isSameProfile={isSameProfile}
                      requestorName={profile.name}
                      slug={slug}
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
  const session = await getSession(context);
  const slug = context.query.slug.toLowerCase();
  const slugProfile = await prisma.profile.findUnique({
    where: {
      slug: slug,
    },
    include: { competencies: true },
  });

  const profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email as string,
    },
  });

  let competencies: any = null;

  if (slugProfile) {
    competencies = await prisma.competency.findMany({
      include: { skills: true },
    });

    const refreshCompetenciesList = () => {
      competencies.forEach(function (competency: any) {
        if (
          slugProfile?.competencies.find(
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

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }
  let isSameProfile = false;
  if (profile && slugProfile) {
    if (profile!.id === slugProfile!.id) {
      isSameProfile = true;
    }
  } else {
    isSameProfile = false;
  }

  return {
    props: { session, profile, slugProfile, competencies, isSameProfile, slug },
  };
};
