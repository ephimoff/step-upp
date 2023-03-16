import type { Profile as ProfileType } from '@prisma/client';
import type { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { useState, useEffect, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { Check } from 'lucide-react';
import { profileSchema } from '@/schemas/validationSchemas';
import { accountFields } from '@/data/data';
import { generateSlug, generateUniqueSlug } from '@/utils/functions';
import Sidebar from '@/components/Sidebar/Sidebar';
import InputAndLabel from '@/components/InputAndLabel';
import prisma from '@/utils/prisma';
import NoAvatar from '@/components/NoAvatar';
import Card from '@/components/Card';
import CustomButton from '@/components/CustomButton';
import Image from 'next/image';

type Props = {
  profile: ProfileType;
  isNewProfile: boolean;
};

export default function AccountPage({ profile, isNewProfile }: Props) {
  const { data: session, status } = useSession();
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

  const updateProfile = useCallback(
    async (values: any) => {
      const url = `/api/profile?email=${queryEmail}`;
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
      try {
        // console.log('inside Update Profile function');
        // console.log('newProfile', newProfile);
        const response = await fetch(url, {
          method: 'PUT',
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
      } catch (error) {
        console.error(
          `[ERROR] Caught an error processing a response from ${url}. Error: ${error}`
        );
      }
    },
    [queryEmail]
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
    }
  }, [initialName, profile, session, initialSlug, updateProfile]);

  return (
    <>
      <Sidebar name={initialName}>
        {status === 'authenticated' ? (
          <>
            <Card>
              {isNewProfile && (
                <div className="text-center">
                  <span className="flex rounded-lg bg-purple-500 py-2 px-4 text-white">
                    <Check className="mr-4" /> Your new profile is created. You
                    can update it below
                  </span>
                </div>
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
            </Card>
          </>
        ) : (
          <p>You are not signed in</p>
        )}
      </Sidebar>
    </>
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  // const session = await getSession(context);
  const session = await getServerSession(req, res, authOptions);
  let isNewProfile = false;

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
    const initialName = session!.user!.name
      ? session!.user!.name
      : session!.user!.email!.split('@')[0];
    const initialSlug = generateSlug(initialName);
    let isSlugAvailable = false;
    const slugProfile = await prisma.profile.findUnique({
      where: {
        slug: initialSlug as string,
      },
    });
    if (!slugProfile || slugProfile.email === session!.user!.email) {
      isSlugAvailable = true;
    } else {
      isSlugAvailable = false;
    }

    const newProfile = await prisma.profile
      .create({
        data: {
          name: initialName,
          email: session!.user!.email as string,
          slug: isSlugAvailable ? initialSlug : generateUniqueSlug(initialSlug),
          userpic: session!.user!.image,
          title: '',
          team: '',
          github: '',
          linkedin: '',
          twitter: '',
          phone: '',
          user: { connect: { email: session!.user!.email as string } },
        },
      })
      .catch(async (e) => {
        console.error(`[ERROR] /account Saving new profile failed: ${e}`);
      });
    isNewProfile = true;
  }

  return {
    props: { session, profile, isNewProfile },
  };
};
