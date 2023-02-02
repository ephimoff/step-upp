import prisma from '@/utils/prisma';
import Sidebar from '@/components/Sidebar/Sidebar';
import { ProfileType } from '@/types/types';
import { getSession } from 'next-auth/react';
import Card from '@/components/Card';
import Scores from '@/components/Scores';

type ThreeSixtyPageProps = {
  profile: ProfileType;
};

const ThreeSixtyPage = ({ profile }: ThreeSixtyPageProps) => {
  const title = profile
    ? `${profile.name}'s profile on StepUpp`
    : 'No profile was found';
  // console.log('profile', profile);
  const skills = profile.skills;

  return (
    <>
      <Sidebar title={title} name={profile.name}>
        <div>
          <h2>{profile.name}</h2>
          <Card>
            <p>
              Please review the below skills of {profile.name} and evaluate them
              on a scale from 1 to 10:
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
            <Scores skills={skills} />
          </Card>
        </div>
      </Sidebar>
    </>
  );
};
export default ThreeSixtyPage;

export const getServerSideProps = async (context: any) => {
  const slug = context.query.slug.toLowerCase();
  const profile = await prisma.profile.findUnique({
    where: {
      slug: slug,
    },
    include: { skills: { include: { skill: true, scores360: true } } },
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
