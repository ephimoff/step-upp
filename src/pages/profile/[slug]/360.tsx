import prisma from '@/utils/prisma';
import Sidebar from '@/components/Sidebar/Sidebar';
import { ProfileType } from '@/types/types';
import { getSession } from 'next-auth/react';
import Card from '@/components/Card';
import Scores from '@/components/Scores';

type ThreeSixtyPageProps = {
  // session: any;
  appraiseeProfile: ProfileType;
  appraiserProfile: ProfileType;
};

const ThreeSixtyPage = ({
  appraiseeProfile,
  appraiserProfile,
}: ThreeSixtyPageProps) => {
  const title = appraiseeProfile
    ? `${appraiseeProfile.name}'s profile on StepUpp`
    : 'No profile was found';
  const skills = appraiseeProfile.skills;

  return (
    <>
      <Sidebar title={title} name={appraiseeProfile.name}>
        <div>
          <h2>{appraiseeProfile.name}</h2>
          <Card>
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
export default ThreeSixtyPage;

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  // console.log(session);
  const slug = context.query.slug.toLowerCase();
  const appraiseeProfile = await prisma.profile.findUnique({
    where: {
      slug: slug,
    },
    include: { skills: { include: { skill: true } } },
  });

  // console.dir(appraiseeProfile, { depth: null });

  let appraiserProfile = null;
  if (session) {
    appraiserProfile = await prisma.profile.findUnique({
      where: {
        email: session.user!.email as string,
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

  return {
    props: { session, appraiseeProfile, appraiserProfile },
  };
};
