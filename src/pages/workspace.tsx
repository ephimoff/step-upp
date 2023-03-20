import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Sidebar from '@/components/Sidebar/Sidebar';
import prisma from '@/utils/prisma';
import Card from '@/components/Card';
import FormikForm from '@/components/FormikForm';

type Props = {
  profile: any;
};

const WorkspacePage = ({ profile }: Props) => {
  console.log('profile', profile);
  const fields = [
    {
      label: 'Workspace',
      value: profile.user.membership[0].workspace.name,
    },
    {
      label: 'Description',
      value: profile.user.membership[0].workspace.description || '',
    },
  ];
  return (
    <>
      <Sidebar name={profile.name}>
        <Card>
          <h1>Workspace</h1>
          <h2>About</h2>
          <FormikForm fields={fields} />
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
      user: { include: { membership: { include: { workspace: true } } } },
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
  console.log('profile.user.membership', profile!.user.membership);
  console.info(`${PAGE} page - Profile found`);
  console.debug(`${PAGE} page - Profile: `, profile);

  return {
    props: { session, profile },
  };
};
