import type { GetServerSidePropsContext } from 'next';
import type { MembershipType, ProfileType } from '@/types/types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Check } from 'lucide-react';
import { log } from 'next-axiom';
import Sidebar from '@/components/Sidebar/Sidebar';
import React from 'react';
import prisma from '@/utils/prisma';
import Card from '@/components/Card';
import CustomButton from '@/components/CustomButton';

type Props = {
  profile: ProfileType;
  membership: MembershipType[];
};

export default function DesignPage({ profile, membership }: Props) {
  const role = membership[0].role;
  return (
    <>
      <Sidebar name={profile.name} role={role}>
        <Card>
          <h1 className="mb-4 text-2xl text-purple-600">Header H1</h1>
          <h2 className="mb-2 text-xl">Card component</h2>
          <div className="flex">
            <div className="mr-2 w-1/2">
              <h3>Solid</h3>
              <ul>
                <li className="my-2">
                  <CustomButton text="Primary" />
                </li>
                <li className="my-2">
                  <CustomButton text="Primary disabled" disabled />
                </li>
                <li className="my-2">
                  <CustomButton text="Primary full length" fullWidth />
                </li>
                <li className="my-2">
                  <CustomButton text="Primary" icon={<Check size={20} />} />
                </li>
                <li className="my-2">
                  <CustomButton
                    text="Primary"
                    icon={<Check size={20} />}
                    iconAfter
                  />
                </li>
                <li className="my-2">
                  <CustomButton text="Secondary" role="secondary" />
                </li>
                <li className="my-2">
                  <CustomButton text="No border" role="noborder" />
                </li>
                <li className="my-2">
                  <CustomButton text="Remove" role="red" />
                </li>
                <li className="my-2">
                  <CustomButton text="Small" size="small" />
                </li>
              </ul>
            </div>
            <div className="w-1/2">
              <h3>Outlined</h3>
              <ul>
                <li className="my-2">
                  <CustomButton text="Primary" outline />
                </li>
                <li className="my-2">
                  <CustomButton text="Primary disabled" disabled outline />
                </li>
                <li className="my-2">
                  <CustomButton text="Primary full length" fullWidth outline />
                </li>
                <li className="my-2">
                  <CustomButton
                    text="Primary"
                    icon={<Check size={20} />}
                    outline
                  />
                </li>
                <li className="my-2">
                  <CustomButton
                    text="Primary"
                    icon={<Check size={20} />}
                    iconAfter
                    outline
                  />
                </li>
                <li className="my-2">
                  <CustomButton text="Secondary" role="secondary" outline />
                </li>
                <li className="my-2">
                  <CustomButton text="No border" role="noborder" />
                </li>
                <li className="my-2">
                  <CustomButton text="Remove" role="red" />
                </li>
                <li className="my-2">
                  <CustomButton text="Small" size="small" outline />
                </li>
              </ul>
            </div>
          </div>
        </Card>
        <Card>
          <h1>Inputs</h1>
          <div className="flex items-baseline py-3">
            <label className="w-2/6 text-sm font-thin sm:text-base">
              Label
            </label>
            <div className="relative w-3/6">
              <input placeholder="Placeholder" required className="input" />
              <div className="mt-1 text-sm font-normal text-[#fc8181]">
                Error text
              </div>
            </div>
          </div>
          <div className="flex items-baseline py-3">
            <label className="w-2/6 text-sm font-thin sm:text-base">
              Label
            </label>
            <div className="relative w-3/6">
              <input placeholder="Placeholder" required className="input" />
              <div className="mt-1 text-sm font-normal text-[#fc8181]">
                Error text
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <input
              name="score"
              type="text"
              className="input input-short mr-2"
              placeholder="10"
            />
            <CustomButton text="Primary" outline />
            <span>
              <Check />
            </span>
          </div>
        </Card>
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
  const PAGE = 'Design';

  if (!session) {
    log.warn(`${PAGE} page - Session not found. Redirecting to /auth/signin`);
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }
  log.info(`${PAGE} page - Session found`);
  log.debug(`${PAGE} page - Session: `, session);

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

  if (!profile) {
    log.warn(`${PAGE} page - Profile not found. Redirecting to /account`);
    return {
      redirect: {
        destination: '/account',
      },
    };
  }
  let membership = profile.user.membership;
  log.info(`${PAGE} page - Profile found`);
  log.debug(`${PAGE} page - Profile: `, profile);

  if (membership[0].role !== 'OWNER') {
    log.warn(
      `${PAGE} page - The user is not allowed to see this page. Redirecting to /`
    );
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  // a hack to deal with the serialising the date objects
  profile = JSON.parse(JSON.stringify(profile));
  membership = JSON.parse(JSON.stringify(membership));
  return {
    props: { session, profile, membership },
  };
};
