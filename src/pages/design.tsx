import Sidebar from '@/components/Sidebar/Sidebar';
import { getSession } from 'next-auth/react';
import React from 'react';
import prisma from '@/utils/prisma';
import { ProfileType } from '@/types/types';
import Card from '@/components/Card';
import CustomButton from '@/components/CustomButton';
import { Check } from 'lucide-react';

type Props = {
  profile: ProfileType;
};

export default function DesignPage({ profile }: Props) {
  return (
    <>
      <Sidebar name={profile.name}>
        <div>
          <h1 className="mb-4 text-2xl">Header H1</h1>
        </div>
        <Card>
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
        <div>
          <h2>Out of the card</h2>
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
              <CustomButton text="Primary" icon={<Check />} />
            </li>
            <li className="my-2">
              <CustomButton text="Primary" icon={<Check />} iconAfter />
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
