import type { GetServerSidePropsContext } from 'next';
import type {
  CompetencyType,
  MembershipType,
  ProfileType,
} from '@/types/types';
// import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Sidebar from '@/components/Sidebar/Sidebar';
import prisma from '@/utils/prisma';
import Link from 'next/link';

type Props = {
  competency: CompetencyType;
  profile: ProfileType;
  membership: MembershipType[];
};

const CompetencyPage = ({ competency, profile, membership }: Props) => {
  const title = competency
    ? `${competency.name}'s profile on StepUpp`
    : 'No competency was found';

  const role = membership[0].role;
  return (
    <>
      <Sidebar title={title} name={profile.name} role={role}>
        {competency ? (
          <div>yes</div>
        ) : (
          <div>
            <h2>No competency with such slug is found</h2>
            <Link
              href="/competency"
              className="border-b border-b-orange-500 text-orange-400"
            >
              Go back to the list of competencies
            </Link>
          </div>
        )}
      </Sidebar>
    </>
  );
};
export default CompetencyPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, res } = context;
  // const session = await getSession(context);
  const session = await getServerSession(req, res, authOptions);
  const slug = context.query.slug!.toString().toLowerCase();
  const competency = await prisma.competency.findUnique({
    where: {
      id: slug,
    },
  });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }

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

  if (!profile) {
    return {
      redirect: {
        destination: '/account',
      },
    };
  }
  const membership = profile.user.membership;

  // a hack to deal with the serialising the date objects
  profile = JSON.parse(JSON.stringify(profile));
  return {
    props: { session, competency, profile, membership },
  };
};
