import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
// import ProfileForm from '@/components/ProfileForm';
import { useState, useEffect } from 'react';
import { Profile as ProfileType } from '@prisma/client';
import ProfileFormInput from '@/components/ProfileFormInput';

export default function Profile() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [name, setName] = useState<string>(session!.user!.name as string);
  const [email, setEmail] = useState<string>(session!.user!.email as string);
  const [phone, setPhone] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [github, setGithub] = useState<string>('');
  const queryEmail = session!.user!.email;

  useEffect(() => {
    const fetchProfile = async (email: string) => {
      const res = await fetch(`/api/profile?email=${email}`);
      const profile: ProfileType = await res.json();
      // console.log('useEffect: ');
      // console.log(profile);
      if (res.status === 200) {
        setProfile(profile);
        setName(profile.name);
        setEmail(profile.email);
        setPhone(profile.phone as string);
        setTwitter(profile.twitter as string);
        setLinkedin(profile.linkedin as string);
        setGithub(profile.github as string);
      } else {
        setProfile(null);
      }
    };
    fetchProfile(queryEmail as string);
  }, []);

  async function handleSubmit(event: any) {
    event.preventDefault();
    let url = '/api/profile';
    let method = 'POST';
    const newProfile = {
      name: name,
      email: email,
      phone: phone,
      twitter: twitter,
      linkedin: linkedin,
      github: github,
      user: { connect: { email: queryEmail } },
    };
    if (profile) {
      url += `?email=${queryEmail}`;
      method = 'PUT';
    }
    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(newProfile),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const profileResponse = await await response.json();
      // console.log('profileResponse');
      // console.log(profileResponse);
      setProfile(profileResponse);
      return profileResponse;
    } catch (error) {
      console.error(error);
    }
  }

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
              <form onSubmit={handleSubmit}>
                <ProfileFormInput
                  name={'Name'}
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  value={name}
                  required
                />
                <ProfileFormInput
                  name={'Email'}
                  type="email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  value={email}
                  required
                />
                <ProfileFormInput
                  name={'Phone'}
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPhone(e.target.value)
                  }
                  value={phone}
                />
                <ProfileFormInput
                  name={'Twitter'}
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTwitter(e.target.value)
                  }
                  value={twitter}
                />
                <ProfileFormInput
                  name={'Linkedin'}
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLinkedin(e.target.value)
                  }
                  value={linkedin}
                />
                <ProfileFormInput
                  name={'GitHub'}
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGithub(e.target.value)
                  }
                  value={github}
                />
                {/* <div>
                  <label htmlFor="name" className="">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="rounded-md border bg-slate-700 p-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span>Required</span>
                </div> 
                <label htmlFor="email" className="">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="rounded-md border bg-slate-700 p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="phone" className="">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="rounded-md border bg-slate-700 p-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="twitter" className="">
                  Twitter
                </label>
                <input
                  type="text"
                  id="twitter"
                  name="twitter"
                  className="rounded-md border bg-slate-700 p-2"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
                <label htmlFor="linkedin" className="">
                  LinkedIn
                </label>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  className="rounded-md border bg-slate-700 p-2"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
                <label htmlFor="github" className="">
                  GitHub
                </label>
                <input
                  type="text"
                  id="github"
                  name="github"
                  className="rounded-md border bg-slate-700 p-2"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />*/}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-2 shadow-md hover:bg-gradient-to-l"
                >
                  {profile ? 'Update profile' : 'Save new profile'}
                </button>
              </form>
              {/* <ProfileForm profile={profile} /> */}
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
