import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import ProfileForm from '@/components/ProfileForm';
import { useState, useEffect } from 'react';

export default function Profile() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const queryEmail = session!.user!.email;

  useEffect(() => {
    fetch(`/api/profile?email=${queryEmail}`).then((res: any) => {
      if (res.status === 200) {
        setProfile(res);
      } else {
        setProfile(null);
      }
    });
  }, []);

  return (
    <>
      <Sidebar>
        {status === 'authenticated' ? (
          <>
            <div className="mx-auto w-full max-w-2xl rounded-xl bg-slate-900 py-4 px-6 drop-shadow-2xl">
              {!profile ? (
                <p className="font-thin">
                  You logged in as {session.user!.name} but don't have a profile
                  yet. Please fill it up down below and save.
                </p>
              ) : (
                <p className="font-thin">
                  Welcome back {session.user!.name}. Here you can edit your
                  profile.
                </p>
              )}
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

  return {
    props: { session },
  };
};
