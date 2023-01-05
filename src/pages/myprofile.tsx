import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import { Profile as ProfileType } from '@prisma/client';
import { Form, Formik } from 'formik';
import ProfileInput from '@/components/ProfileInput';
import { profileSchema } from '@/schemas/profileSchema';

export default function MyProfile() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [name, setName] = useState<string>(session!.user!.name as string);
  const [email, setEmail] = useState<string>(session!.user!.email as string);
  const [title, setTitle] = useState<string>('');
  const [team, setTeam] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [github, setGithub] = useState<string>('');
  const queryEmail = session!.user!.email;

  useEffect(() => {
    const fetchProfile = async (email: string) => {
      const res = await fetch(`/api/profile?email=${email}`);
      const profile: ProfileType = await res.json();

      if (res.status === 200) {
        setProfile(profile);
        setName(profile.name);
        setEmail(profile.email);
        setTitle(profile.title as string);
        setTeam(profile.team as string);
        setSlug(profile.slug as string);
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

  async function updateProfile(values: any) {
    let url = '/api/profile';
    let method = 'POST';
    const newProfile = {
      name: values.name,
      email: values.email,
      title: values.title,
      team: values.team,
      slug: values.slug,
      phone: values.phone,
      twitter: values.twitter,
      linkedin: values.linkedin,
      github: values.github,
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
              <Formik
                enableReinitialize
                initialValues={{
                  name: name,
                  email: email,
                  title: title,
                  team: team,
                  slug: slug,
                  phone: phone,
                  twitter: twitter,
                  linkedin: linkedin,
                  github: github,
                }}
                validationSchema={profileSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  // console.log(values);
                  updateProfile(values);
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form className="">
                    <ProfileInput
                      label="Name"
                      name="name"
                      type="input"
                      placeholder="John Doe"
                      required
                    />
                    <ProfileInput
                      label="Email"
                      name="email"
                      type="input"
                      placeholder="email@example.com"
                      required
                    />
                    <ProfileInput
                      label="Title"
                      name="title"
                      type="input"
                      placeholder="Senior Product Manager"
                    />
                    <ProfileInput
                      label="Team"
                      name="team"
                      type="input"
                      placeholder="Platform team"
                    />
                    <ProfileInput
                      label="Slug"
                      name="slug"
                      type="input"
                      placeholder="your-slug"
                    />
                    <ProfileInput
                      label="Phone"
                      name="phone"
                      type="input"
                      placeholder="1234567"
                    />
                    <ProfileInput
                      label="Twitter"
                      name="twitter"
                      type="input"
                      placeholder="@johndoe"
                    />
                    <ProfileInput
                      label="LinkedIn"
                      name="linkedin"
                      type="input"
                      placeholder="https://www.linkedin.com/in/johndoe/"
                    />
                    <ProfileInput
                      label="GitHub"
                      name="github"
                      type="input"
                      placeholder="@johndoe"
                    />
                    <pre className="text-sm font-thin text-white">
                      {JSON.stringify(values, null, 2)}
                    </pre>
                    <pre className="text-sm font-thin text-red-500">
                      {JSON.stringify(errors, null, 2)}
                    </pre>
                    <button
                      type="submit"
                      disabled={
                        isSubmitting || Object.keys(errors).length !== 0
                      }
                      className={`${
                        (isSubmitting || Object.keys(errors).length !== 0) &&
                        'opacity-40'
                      }  w-full rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-2 shadow-md hover:bg-gradient-to-l`}
                    >
                      {profile ? 'Update profile' : 'Save new profile'}
                    </button>
                  </Form>
                )}
              </Formik>
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
