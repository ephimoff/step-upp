import { useSession, getSession } from 'next-auth/react';
import Head from 'next/head';
import Sidebar from '@/components/Sidebar';
import { siteTitle } from '@/data/data';
import prisma from '@/utils/prisma';
import ProfileForm from '@/components/ProfileForm';

export default function Profile({ profile }: any) {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Sidebar>
        {status === 'authenticated' ? (
          <>
            <div className="mx-auto w-full max-w-2xl rounded-xl bg-slate-900 py-4 px-6 drop-shadow-2xl">
              <p>Welcome {session.user!.name}.</p>
              {!profile ? (
                <p className="font-thin">
                  You don't have a profile yet. Please fill it up down below and
                  save
                </p>
              ) : null}
              <ProfileForm profile={profile} />
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

  return {
    props: { session, profile },
  };
};
