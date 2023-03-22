import type { GetServerSidePropsContext } from 'next';
import type { MembershipType } from '@/types/types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Sidebar from '@/components/Sidebar/Sidebar';
import prisma from '@/utils/prisma';
import Card from '@/components/Card';
import FormikForm from '@/components/FormikForm';

type Props = {
  profile: any;
  membership: MembershipType[];
};

const WorkspacePage = ({ profile, membership }: Props) => {
  console.log('membership', membership);
  const workspace = {
    name: membership[0].workspace.name,
    description: membership[0].workspace.description,
  };
  const plan = {
    id: membership[0].workspace.plan.id,
    name: membership[0].workspace.plan.name,
  };
  const role = membership[0].role;

  const fields = [
    {
      label: 'Workspace',
      value: workspace.name,
    },
    {
      label: 'Description',
      value: workspace.description || '',
    },
  ];
  return (
    <>
      <Sidebar name={profile.name} role={role}>
        <Card>
          <h1 className="text-xl">Workspace</h1>
          <h2 className="mt-6 text-lg">About</h2>
          <FormikForm fields={fields} />
          <h2 className="mt-6 text-lg">Plan</h2>
          <div>
            <span className="mr-4 rounded-lg bg-purple-600 px-4">
              {plan.name}
            </span>
            <button className="text-sm font-thin text-gray-500 hover:underline dark:text-gray-300">
              Upgrade
            </button>
          </div>

          <pre className="text-xs font-thin text-black dark:text-white">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </Card>
      </Sidebar>
    </>
  );
};
export default WorkspacePage;

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);
  const PAGE = 'Workspace';

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

  const profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email as string,
    },
    include: {
      user: {
        include: {
          membership: { include: { workspace: { include: { plan: true } } } },
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
  console.log('membership', membership);

  return {
    props: { session, profile, membership },
  };
};
