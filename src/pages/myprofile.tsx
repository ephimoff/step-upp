import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import { Profile as ProfileType } from '@prisma/client';
import { Form, Formik } from 'formik';
import InputAndLabel from '@/components/InputAndLabel';
import { profileSchema } from '@/schemas/validationSchemas';
import prisma from '@/utils/prisma';
import NoAvatar from '@/components/NoAvatar';

type MyProfilePageProps = {
  profile: ProfileType;
};

export default function MyProfilePage({ profile }: MyProfilePageProps) {
  const { data: session, status } = useSession();
  // profile
  const [currentProfile, setCurrentProfile] = useState<ProfileType | null>(
    null
  );
  // profile fields
  const initialName = profile.name
    ? profile.name
    : session!.user!.name
    ? session!.user!.name
    : session!.user!.email!.split('@')[0];
  const [name, setName] = useState<string>(initialName);
  const [email, setEmail] = useState<string>(session!.user!.email as string);
  const [userpic, setUserpic] = useState<string>(
    session!.user!.image as string
  );
  const [title, setTitle] = useState<string>('');
  const [team, setTeam] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [github, setGithub] = useState<string>('');
  // email to query
  const queryEmail = session!.user!.email;
  console.log(session);

  useEffect(() => {
    if (profile) {
      setCurrentProfile(profile);
      setName(profile.name);
      setEmail(profile.email);
      setUserpic(profile.userpic as string);
      setTitle(profile.title as string);
      setTeam(profile.team as string);
      setSlug(profile.slug as string);
      setPhone(profile.phone as string);
      setTwitter(profile.twitter as string);
      setLinkedin(profile.linkedin as string);
      setGithub(profile.github as string);
    }
  }, []);

  async function updateProfile(values: any) {
    let url = '/api/profile';
    let method = 'POST';
    const newProfile = {
      name: values.name,
      email: values.email,
      userpic: values.userpic,
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
      const profileResponse = await response.json();

      setCurrentProfile(profileResponse);
      return profileResponse;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Sidebar name={initialName}>
        {status === 'authenticated' ? (
          <>
            <div className="mx-auto w-full max-w-2xl rounded-xl bg-slate-900 py-4 px-6 drop-shadow-2xl">
              {!profile ? (
                <p className="font-thin">
                  You logged in as <strong>{initialName}</strong> but don't have
                  a profile yet. Please fill it up down below and save.
                </p>
              ) : (
                <p className="font-thin">
                  Welcome back <strong>{initialName}</strong>. Here you can edit
                  your profile.
                </p>
              )}
              <Formik
                enableReinitialize
                initialValues={{
                  name: name,
                  email: email,
                  userpic: userpic,
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
                    <div className="mx-auto my-4 h-32 w-32">
                      {userpic ? (
                        <img
                          src={userpic}
                          alt=""
                          className="rounded-full shadow-md"
                        />
                      ) : (
                        <NoAvatar name={initialName} size={32} />
                      )}
                    </div>

                    <InputAndLabel
                      label="Name"
                      name="name"
                      type="input"
                      placeholder="John Doe"
                      required
                    />
                    <InputAndLabel
                      label="Email"
                      name="email"
                      type="input"
                      placeholder="email@example.com"
                      required
                    />
                    <InputAndLabel
                      label="Title"
                      name="title"
                      type="input"
                      placeholder="Senior Product Manager"
                    />
                    <InputAndLabel
                      label="Team"
                      name="team"
                      type="input"
                      placeholder="Platform team"
                    />
                    <InputAndLabel
                      label="Slug"
                      name="slug"
                      type="input"
                      placeholder="your-slug"
                    />
                    <InputAndLabel
                      label="Phone"
                      name="phone"
                      type="input"
                      placeholder="1234567"
                    />
                    <InputAndLabel
                      label="Twitter"
                      name="twitter"
                      type="input"
                      placeholder="@johndoe"
                    />
                    <InputAndLabel
                      label="LinkedIn"
                      name="linkedin"
                      type="input"
                      placeholder="https://www.linkedin.com/in/johndoe/"
                    />
                    <InputAndLabel
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
                      }  w-full rounded-lg bg-gradient-to-l from-[#00B4DB] to-[#0083B0] py-2 shadow-md hover:bg-gradient-to-r `}
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
  const profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email as string,
    },
  });

  return {
    props: { session, profile },
  };
};
