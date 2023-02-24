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
            <p>Welcome {session.user!.name}</p>
            <ul>
              <li>
                <Link
                  href="/profile/anton-efimov"
                  className="border-b border-b-orange-500 text-orange-400"
                >
                  Anton Efimov's profile (github)
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/anton-efimov/feedbackscore?token=abc"
                  className="border-b border-b-orange-500 text-orange-400"
                >
                  Anton Efimov's (github) feedback with token
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/anton-efimov/feedbackscore?token=abcabc"
                  className="border-b border-b-orange-500 text-orange-400"
                >
                  Anton Efimov's (github) feedback with wrong token
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/anton-efimov/feedbackscore"
                  className="border-b border-b-orange-500 text-orange-400"
                >
                  Anton Efimov's (github) feedback with no token
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/efimov-anton"
                  className="border-b border-b-orange-500 text-orange-400"
                >
                  John Doe's profile (magic link)
                </Link>
              </li>
            </ul>
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
        destination: '/myprofile',
      },
    };
  }

  return {
    props: { session, profile },
  };
};
