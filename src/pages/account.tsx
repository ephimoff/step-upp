import type { Profile as ProfileType } from '@prisma/client';
import type { MembershipType } from '@/types/types';
import type { GetServerSidePropsContext } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { useState, useEffect, useCallback } from 'react';
import { Check, X as Close } from 'lucide-react';
import { generateSlug, generateUniqueSlug } from '@/utils/functions';
import { string } from 'yup';
import { log } from 'next-axiom';
import FormikForm from '@/components/FormikForm';
import Sidebar from '@/components/Sidebar/Sidebar';
import prisma from '@/utils/prisma';
import NoAvatar from '@/components/NoAvatar';
import Card from '@/components/Card';
import Image from 'next/image';
import Link from 'next/link';
// import { profileSchema } from '@/schemas/validationSchemas';
// import { accountFields } from '@/data/data';
// import InputAndLabel from '@/components/InputAndLabel';
// import CustomButton from '@/components/CustomButton';
// import { Form, Formik } from 'formik';

type Props = {
  profile: ProfileType;
  membership: MembershipType[];
  isNewProfile: boolean;
  isNewWorkspace: boolean;
  isNewMembership: boolean;
};

export default function AccountPage({
  profile,
  membership,
  isNewProfile,
  isNewWorkspace,
  isNewMembership,
}: Props) {
  const { data: session, status } = useSession();
  const [success, setSuccess] = useState(false);
  const [newProfileShow, setNewProfileShow] = useState(true);
  const [newWorkspaceShow, setNewWorkspaceShow] = useState(true);
  const [newMembershipShow, setNewMembershipShow] = useState(true);

  const role = membership[0].role;

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
      const functionName = 'updateProfile';
      const method = 'PUT';
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
        const response = await fetch(url, {
          method: method,
          body: JSON.stringify(newProfile),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        log.info(
          `${functionName} function -  ${method} ${url} response: ${response.status}`
        );
        if (response.status < 300) {
          setSuccess(true);
        }
        const profileResponse = await response.json();

        setCurrentProfile(profileResponse);
        return response;
      } catch (error) {
        log.error(
          `${functionName} function - ${method} ${url} error: ${error}`
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

  const fields = [
    {
      name: 'name',
      label: 'Name',
      placeholder: 'John Doe',
      value: name,
      type: string().required('Required'),
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'email@example.com',
      value: email,
      type: string().email('Please enter a valid email').required('Required'),
    },
    {
      name: 'title',
      label: 'Title',
      placeholder: 'Senior Product Manager',
      value: title,
      type: string(),
    },
    {
      name: 'team',
      label: 'Team',
      placeholder: 'Platform team',
      value: team,
      type: string(),
    },
    {
      name: 'slug',
      label: 'Slug',
      placeholder: 'your-slug',
      value: slug,
      type: string()
        .required('Required')
        .test(
          'Unique slug',
          'Slug is already in use. Change it or generate a new one',
          async (value, slug) => {
            const { status } = await fetch(
              `/api/slug?slug=${value}&email=${slug.parent.email}`
            );
            return status === 200 ? true : false;
          }
        ),
    },
    {
      name: 'phone',
      label: 'Phone',
      placeholder: '1234567',
      value: phone,
      type: string(),
    },
    {
      name: 'twitter',
      label: 'Twitter',
      placeholder: '@johndoe',
      value: twitter,
      type: string(),
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      placeholder: 'https://www.linkedin.com/in/johndoe/',
      value: linkedin,
      type: string().url('The field must be a valid URL'),
    },
    {
      name: 'github',
      label: 'GitHub',
      placeholder: '@johndoe',
      value: github,
      type: string(),
    },
  ];

  return (
    <>
      <Sidebar name={initialName} role={role}>
        {status === 'authenticated' ? (
          <>
            <Card>
              {(isNewProfile || isNewWorkspace || isNewMembership) && (
                <div className="text-center">
                  {isNewProfile && newProfileShow && (
                    <span className="duration-600 relative mb-2 flex items-center rounded-lg bg-purple-500 py-2 px-4 text-white">
                      <Check className="mr-4 text-purple-300" /> Your new
                      profile is created. You can update it below
                      <button
                        className="absolute right-3"
                        onClick={() => setNewProfileShow(false)}
                      >
                        <Close size={16} />
                      </button>
                    </span>
                  )}
                  {isNewWorkspace && newWorkspaceShow && (
                    <span className="duration-600 relative mb-2 flex rounded-lg bg-purple-500 py-2 px-4 text-white">
                      <Check className="mr-4 text-purple-300" /> A new workspace
                      was created:
                      <Link
                        href="/workspace"
                        className="mx-2 font-medium text-green-500 underline"
                      >
                        My workspace
                      </Link>
                      <button
                        className="absolute right-3"
                        onClick={() => setNewWorkspaceShow(false)}
                      >
                        <Close size={16} />
                      </button>
                    </span>
                  )}
                  {isNewMembership && newMembershipShow && (
                    <span className="duration-600 relative mb-2 flex rounded-lg bg-purple-500 py-2 px-4 text-white">
                      <Check className="mr-4 text-purple-300" /> You are now a
                      member of a workspace
                      <button
                        className="absolute right-3"
                        onClick={() => setNewMembershipShow(false)}
                      >
                        <Close size={16} />
                      </button>
                    </span>
                  )}
                </div>
              )}
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
              <FormikForm fields={fields} onSubmit={updateProfile} />
              {/* <Formik
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
              </Formik> */}
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
  const PAGE = 'Account';
  const session = await getServerSession(req, res, authOptions);
  // redirect to the login page early
  if (!session) {
    log.warn(`${PAGE} page - Session not found. Redirecting to /auth/signin`);
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }

  const domain = session!.user!.email!.split('@')[1];
  const initialName = session!.user!.name
    ? session!.user!.name
    : session!.user!.email!.split('@')[0];
  const initialSlug = generateSlug(initialName);
  let isSlugAvailable = false;
  let isNewProfile = false;
  let isNewWorkspace = false;
  let isNewMembership = false;
  let isPublicDomain = false;
  let membership = [];

  // check if there is a workspace with the same domain
  const workspaceAccess = await prisma.workspaceAccess.findUnique({
    where: {
      domain: domain,
    },
    include: {
      workspace: true,
    },
  });

  // search for the profile
  let profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email as string,
    },
    include: {
      user: {
        include: {
          membership: true,
        },
      },
    },
  });

  if (profile) {
    membership = profile!.user.membership;
    log.info(`${PAGE} page: Profile was found`);
    log.debug(`${PAGE} page: Profile's membership is:`, membership);
  } else {
    log.warn(`${PAGE} page: Profile not found`);
    // Creating a new profile and onboarding a user to the workspace
    const slugProfile = await prisma.profile.findUnique({
      where: {
        slug: initialSlug as string,
      },
    });

    if (workspaceAccess) {
      log.info(`${PAGE} page: Workspace was found`);
      log.debug(`${PAGE} page: Workspace data:`, workspaceAccess);
      const workspace = workspaceAccess.workspace;
      const singleMembership = await prisma.membership.create({
        data: {
          user: { connect: { email: session!.user!.email as string } },
          workspace: { connect: { id: workspace.id } },
          role: 'MEMBER',
        },
      });
      if (singleMembership) {
        isNewMembership = true;
      }
      log.info(`${PAGE} page: Membership record has been created`);
      membership.push(singleMembership);
    } else {
      log.warn(`${PAGE} page: Workspace not found. Creating a new one`);

      const workspace = await prisma.workspace.create({
        data: {
          name: 'My Workspace',
          plan: { connect: { name: 'Free' } },
        },
      });

      if (workspace) {
        isNewWorkspace = true;
      }
      log.info(`${PAGE} page: Workspace has been created`);
      log.debug(`${PAGE} page: Workspace data:`, workspace);

      const singleMembership = await prisma.membership.create({
        data: {
          user: { connect: { email: session!.user!.email as string } },
          workspace: { connect: { id: workspace.id } },
          role: 'OWNER',
        },
      });
      if (singleMembership) {
        isNewMembership = true;
      }
      log.info(`${PAGE} page: Membership record has been created`);
      log.debug(`${PAGE} page: Membership data:`, singleMembership);
      membership.push(singleMembership);

      const publicDomain = await prisma.publicDomain.findUnique({
        where: {
          domain: domain,
        },
      });
      if (publicDomain) {
        log.warn(
          `${PAGE} page: The email domain was found in the list of public email domains`
        );
        isPublicDomain = true;
      }

      const newWorkspaceAccess = await prisma.workspaceAccess.create({
        data: {
          domain: isPublicDomain ? uuidv4() : domain, // if public domain generate a unique uuid string
          isPublic: true,
          workspace: { connect: { id: workspace.id } },
        },
      });
      log.info(`${PAGE} page: WorkspaceAccess record has been created`);
      log.debug(`${PAGE} page: WorkspaceAccess data:`, newWorkspaceAccess);
    }
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
        log.error(`${PAGE} page: Saving new profile failed:`, e);
        log.debug(
          `${PAGE} page: newProfile:`,
          newProfile as { [key: string]: any }
        );
        log.debug(`${PAGE} page. Profile:`, { profile });
      });
    isNewProfile = true;
    log.info(`${PAGE} page: New profile has been created`);
    log.debug(`${PAGE} page: Profile:`, newProfile as { [key: string]: any });
  }
  // console.log('profile.user', profile!.user);
  // a hack to deal with the serialising the date objects
  profile = JSON.parse(JSON.stringify(profile));
  membership = JSON.parse(JSON.stringify(membership));

  return {
    props: {
      session,
      profile,
      membership,
      isNewProfile,
      isNewWorkspace,
      isNewMembership,
    },
  };
};
