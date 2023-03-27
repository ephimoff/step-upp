import type { GetServerSidePropsContext } from 'next';
import type {
  CompetencyType,
  MembershipType,
  ProfileType,
} from '@/types/types';
import { useCallback, useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Sidebar from '@/components/Sidebar/Sidebar';
import ProfileCard from '@/components/Profile/ProfileCard';
import prisma from '@/utils/prisma';
import CompetencyCard from '@/components/Competencies/CompetencyCard';
import Link from 'next/link';
import ProfileCompetenciesLoading from '@/components/Profile/ProfileCompetenciesLoading';
import Spinner from '@/components/Spinner';

type Props = {
  competencies: any;
  profile: ProfileType;
  membership: MembershipType[];
  slugProfile: ProfileType;
  isSameProfile: boolean;
  slug: string;
};

const ProfilePage = ({
  profile,
  membership,
  slugProfile,
  competencies,
  isSameProfile,
  slug,
}: Props) => {
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
    if (slugProfile) {
      fetchAssignedCompetencies();
    }
  }, [fetchAssignedCompetencies, slugProfile]);

  const role = membership[0].role;
  return (
    <>
      <Sidebar title={title} name={profile ? profile.name : ''} role={role}>
        {slugProfile ? (
          <div className="">
            <ProfileCard
              name={slugProfile.name}
              title={slugProfile.title as string}
              team={slugProfile.team as string}
              email={slugProfile.email}
              userpic={slugProfile.userpic as string}
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);
  const PAGE = 'Profile';
  if (!session) {
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
  let membership: any;
  if (profile) {
    membership = profile.user.membership;
    console.info(`${PAGE} page - Profile found`);
    console.debug(`${PAGE} page - Profile: `, profile);
    console.debug(`${PAGE} page - Membership: `, membership);
  }

  let competencies: any = null;

  const slug = context.query.slug!.toString().toLowerCase();

  let slugProfile = await prisma.profile.findUnique({
    where: {
      slug: slug,
    },
    include: { competencies: true, user: { include: { membership: true } } },
  });

  if (
    slugProfile &&
    membership[0].workspaceId === slugProfile.user.membership[0].workspaceId
  ) {
    // console.log('membership[0].workspaceId', membership[0].workspaceId);
    // console.log(
    //   'slugProfile.user.membership[0].workspaceId',
    //   slugProfile.user.membership[0].workspaceId
    // );
    // console.log(
    //   'membership[0].workspaceId === slugProfile.user.membership[0].workspaceId',
    //   membership[0].workspaceId === slugProfile.user.membership[0].workspaceId
    // );

    console.info(`${PAGE} page - Slug Profile found`);
    console.debug(`${PAGE} page - Slug Profile: `, slugProfile);
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

    if (competencies.length > 0) {
      console.info(`${PAGE} page - Profile Competencies found`);
      console.debug(`${PAGE} page - Profile Competencies: `, competencies);
    }
  } else {
    slugProfile = null;
    console.info(`${PAGE} page - Slug Profile not found`);
    console.debug(`${PAGE} page - Slug was used: `, slug);
  }

  let isSameProfile = false;
  if (profile && slugProfile) {
    if (profile!.id === slugProfile!.id) {
      isSameProfile = true;
    }
  } else {
    isSameProfile = false;
  }

  // a hack to deal with the serialising the date objects
  profile = JSON.parse(JSON.stringify(profile));
  slugProfile = JSON.parse(JSON.stringify(slugProfile));
  membership = JSON.parse(JSON.stringify(membership));
  competencies = JSON.parse(JSON.stringify(competencies));

  return {
    props: {
      session,
      profile,
      membership,
      slugProfile,
      competencies,
      isSameProfile,
      slug,
    },
  };
};
