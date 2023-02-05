import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useState, useEffect } from 'react';
import { Profile as ProfileType } from '@prisma/client';
import { Form, Formik } from 'formik';
import InputAndLabel from '@/components/InputAndLabel';
import { profileSchema } from '@/schemas/validationSchemas';
import prisma from '@/utils/prisma';
import NoAvatar from '@/components/NoAvatar';
import { myProfileFields } from '@/data/data';
import Card from '@/components/Card';
import { generateSlug } from '@/utils/functions';

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
  const initialName = profile?.name
    ? profile.name
    : session!.user!.name
    ? session!.user!.name
    : session!.user!.email!.split('@')[0];

  const initialSlug = generateSlug(initialName);
  const [name, setName] = useState<string>(initialName);
  const [email, setEmail] = useState<string>(session!.user!.email as string);
  const [userpic, setUserpic] = useState<string>(
    session!.user!.image as string
  );
  const [title, setTitle] = useState<string>('');
  const [team, setTeam] = useState<string>('');
  const [slug, setSlug] = useState<string>(initialSlug);
  const [phone, setPhone] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [github, setGithub] = useState<string>('');
  // email to query
  const queryEmail = session!.user!.email;

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
            <Card>
              {!currentProfile ? (
                <p className="font-thin">
                  You have to <strong>create</strong> your profile first before
                  proceeding.
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
                {({ values, errors, isSubmitting }) => (
                  <Form className="">
                    <div className="mx-auto my-4 h-24 w-24 sm:h-32 sm:w-32">
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
                    <div className="">
                      {myProfileFields.map((field, index) => {
                        return (
                          <div key={index}>
                            <InputAndLabel
                              label={field.label}
                              name={field.name}
                              type={field.type as 'input' | 'email'}
                              placeholder={field.placeholder}
                              required={field.required}
                              initialName={initialName}
                            />
                          </div>
                        );
                      })}
                    </div>
                    {/* <pre className="text-sm font-thin text-white">
                      {JSON.stringify(values, null, 2)}
                    </pre>
                    <pre className="text-sm font-thin text-red-500">
                      {JSON.stringify(errors, null, 2)}
                    </pre> */}

                    <button
                      type="submit"
                      disabled={
                        isSubmitting || Object.keys(errors).length !== 0
                      }
                      className={`${
                        (isSubmitting || Object.keys(errors).length !== 0) &&
                        'opacity-40'
                      }  w-full rounded-lg bg-gradient-to-l from-[#00B4DB] to-[#0083B0] py-2 text-white shadow-md hover:bg-gradient-to-r `}
                    >
                      {currentProfile ? 'Update profile' : 'Create profile'}
                    </button>
                  </Form>
                )}
              </Formik>
            </Card>
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
