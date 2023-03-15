import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useState, useEffect, useCallback } from 'react';
import type { Profile as ProfileType } from '@prisma/client';
import { Form, Formik } from 'formik';
import InputAndLabel from '@/components/InputAndLabel';
import { profileSchema } from '@/schemas/validationSchemas';
import prisma from '@/utils/prisma';
import NoAvatar from '@/components/NoAvatar';
import { accountFields } from '@/data/data';
import Card from '@/components/Card';
import { generateSlug } from '@/utils/functions';
import CustomButton from '@/components/CustomButton';
import Image from 'next/image';
import type { GetServerSidePropsContext } from 'next';
import Spinner from '@/components/Spinner';

type Props = {
  profile: ProfileType;
};

export default function AccountPage({ profile }: Props) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const createUniqueSlug = async (slug: string, email: string) => {
    const { status } = await fetch(
      `/api/slug?slug=${slug}&email=${session!.user!.name}`
    );
    return status === 200 ? true : false;
  };

  const updateProfile = useCallback(
    async (values: any) => {
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
        if (response.status === 200) {
          setSuccess(true);
        }
        const profileResponse = await response.json();

        setCurrentProfile(profileResponse);
        return profileResponse;
      } catch (error) {
        console.error(error);
      }
    },
    [profile, queryEmail]
  );

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
    } else {
      setLoading(true);
      const initialValues = {
        name: initialName,
        email: session!.user!.email,
        userpic: session!.user!.image,
        title: '',
        team: '',
        slug: initialSlug,
        phone: '',
        twitter: '',
        linkedin: '',
        github: '',
      };
      console.log('profile is being created', initialValues);
      updateProfile(initialValues);

      setLoading(false);
    }
  }, [initialName, profile, session, initialSlug, updateProfile]);

  return (
    <>
      <Sidebar name={initialName}>
        {status === 'authenticated' ? (
          <>
            <Card>
              {loading ? (
                <Spinner />
              ) : (
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
                  {({ values, errors, touched, isSubmitting }) => (
                    <Form className="">
                      <div className="mx-auto my-4 h-24 w-24 sm:h-32 sm:w-32">
                        {userpic ? (
                          <Image
                            width={96}
                            height={96}
                            src={userpic}
                            alt=""
                            className="rounded-full shadow-md"
                          />
                        ) : (
                          <NoAvatar size={24} />
                        )}
                      </div>
                      <div className="">
                        {accountFields.map((field, index) => {
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
                      <CustomButton
                        type="submit"
                        text="Update profile"
                        role="primary"
                        disabled={
                          isSubmitting || Object.keys(errors).length !== 0
                        }
                      />
                      {success ? (
                        <span className="animate-fade-out text-purple-500 opacity-0">
                          Profile saved
                        </span>
                      ) : null}
                    </Form>
                  )}
                </Formik>
              )}
            </Card>
          </>
        ) : (
          <p>You are not signed in</p>
        )}
      </Sidebar>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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
