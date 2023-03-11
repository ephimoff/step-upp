import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Link from 'next/link';
import prisma from '@/utils/prisma';

export default function MainProfile({ profile }: any) {
  const { data: session, status } = useSession();
  return (
    <>
      <Sidebar name={profile.name}>
        {status === 'authenticated' ? (
          <>
            <div className="flex items-baseline py-3">
              <label className="w-2/6 text-sm font-thin sm:text-base">
                Label
              </label>
              <div className="relative w-3/6">
                <input placeholder="Placeholder" required className="input" />
                <div className="mt-1 text-sm font-normal text-[#fc8181]">
                  Error text
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>You are not signed in</p>
        )}
      </Sidebar>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
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
        destination: '/account',
      },
    };
  }

  return {
    props: { session, profile },
  };
};
