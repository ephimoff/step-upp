import Sidebar from '@/components/Sidebar';
import prisma from '@/utils/prisma';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

const CompetencyPage = ({ competency, profile }: any) => {
  const title = competency
    ? `${competency.name}'s profile on StepUpp`
    : 'No competency was found';
  return (
    <>
      <Sidebar title={title} name={profile.name}>
        {competency ? (
          <div>yes</div>
        ) : (
          <div>
            <h2>No competency with such is found</h2>
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

export const getServerSideProps = async (context: any) => {
  const slug = context.query.slug.toLowerCase();
  const competency = await prisma.competency.findUnique({
    where: {
      id: slug,
    },
  });

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }

  const profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email as string,
    },
  });

  if (!profile) {
    return {
      redirect: {
        destination: '/myprofile',
      },
    };
  }

  return {
    props: { session, competency, profile },
  };
};
