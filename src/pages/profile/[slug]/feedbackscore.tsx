import type { GetServerSidePropsContext } from 'next';
import type { MembershipType, ProfileType } from '@/types/types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/utils/prisma';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Card';
import Scores from '@/components/Scores';

// import useSWR from 'swr';
// import { fetcher } from '@/utils/fetcher';

type Props = {
  appraiseeProfile: ProfileType;
  appraiserProfile: ProfileType;
  membership: MembershipType[];
};

const FeedbackScoresPage = ({
  appraiseeProfile,
  appraiserProfile,
  membership,
}: Props) => {
  const title = appraiseeProfile
    ? `${appraiseeProfile.name}'s profile on StepUpp`
    : 'No profile was found';
  const skills = appraiseeProfile.skills;

  // const { data, error } = useSWR(
  //   `/api/feedbackscore?query=${appraiserProfile.id}`,
  //   fetcher
  // );

  // console.log(appraiserProfile.id);
  // console.log(skills);
  const role = membership[0].role;
  return (
    <>
      <Sidebar title={title} name={appraiseeProfile.name} role={role}>
        <div>
          <Card>
            <h1 className="mb-4 text-2xl text-purple-600">
              {appraiseeProfile.name}
            </h1>
            <p>
              Please review the below skills of {appraiseeProfile.name} and
              evaluate them on a scale from 1 to 10:
            </p>
            <ul className="my-2 text-sm text-gray-400">
              <li>
                <strong>Up to 2</strong> - Very high-level knowledge. No
                practical experience
              </li>
              <li>
                <strong>Between 2 and 4</strong> - Maybe used the skill once or
                twice
              </li>
              <li>
                <strong>Between 4 and 6</strong> - Can finish all the assigned
                tasks
              </li>
              <li>
                <strong>Between 6 and 8</strong> - Can use this skill in the
                work without any guidence from the side
              </li>
              <li>
                <strong>9 and above</strong> - An absolute MVP. You can teach
                others and write books about it
              </li>
            </ul>
            <Scores
              skills={skills}
              appraiseeId={appraiseeProfile.id}
              appraiserId={appraiserProfile.id}
            />
          </Card>
        </div>
      </Sidebar>
    </>
  );
};
export default FeedbackScoresPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, res } = context;
  // const session = await getSession(context);
  const session = await getServerSession(req, res, authOptions);

  const slug = context.query.slug!.toString().toLowerCase();
  let appraiseeProfile = await prisma.profile.findUnique({
    where: {
      slug: slug,
    },
    include: {
      skills: {
        include: {
          skill: true,
          feedbackScores: true,
        },
      },
    },
  });

  // a hack to deal with the serialising the date objects
  appraiseeProfile = JSON.parse(JSON.stringify(appraiseeProfile));

  let appraiserProfile = null;
  if (session) {
    appraiserProfile = await prisma.profile.findUnique({
      where: {
        email: session.user!.email as string,
      },
      include: {
        user: {
          include: {
            membership: true,
          },
        },
      },
    });
  }
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }

  const { token } = context.query;

  if (token) {
    const access = await prisma.feedbackAccessToken.findUnique({
      where: {
        identifier_token: {
          identifier: session.user!.email as string,
          token: token as string,
        },
      },
    });
    if (!access) {
      return {
        redirect: {
          destination: '/',
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: '/',
      },
    };
  }
  let membership = appraiserProfile!.user.membership;

  // a hack to deal with the serialising the date objects
  appraiseeProfile = JSON.parse(JSON.stringify(appraiseeProfile));
  appraiserProfile = JSON.parse(JSON.stringify(appraiserProfile));
  membership = JSON.parse(JSON.stringify(membership));

  return {
    props: { session, appraiseeProfile, appraiserProfile, membership },
  };
};
