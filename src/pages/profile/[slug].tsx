import Sidebar from '@/components/Sidebar';
import UserInfo from '@/components/Profile/ProfileCard';
import { dataFull, dataEmpty } from '@/data/data';
import prisma from '@/utils/prisma';
import { getSession } from 'next-auth/react';
import React, { useState } from 'react';
import CompetencyCard from '@/components/Competencies/CompetencyCard';
import Link from 'next/link';
import CustomButton from '@/components/CustomButton';
import Dropdown from '@/components/Dropdown';

const options = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
];

const ProfilePage = ({ profile }: any) => {
  const [selected, setSelected] = useState(options[0]);
  console.log(selected);

  function handleSelected(value: any) {
    setSelected(value);
  }
  const title = profile
    ? `${profile.name}'s profile on StepUpp`
    : 'No profile was found';
  return (
    <>
      <Sidebar title={title}>
        {profile ? (
          <div className="">
            <UserInfo
              name={profile.name}
              title={profile.title}
              team={profile.team}
              email={profile.email}
            />
            <div className="flex">
              <div>
                <CustomButton text={'Assign competency'} />
              </div>
              <div>
                <Dropdown
                  options={options}
                  selected={selected}
                  setSelected={handleSelected}
                />
              </div>
            </div>
            <CompetencyCard competencies={dataFull} />
          </div>
        ) : (
          <div>
            <h2>No competency with such is found</h2>
            <ul>
              <li>
                <Link
                  href="/"
                  className="border-b border-b-orange-500 text-orange-400"
                >
                  Go back home
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="border-b border-b-orange-500 text-orange-400"
                >
                  Go back to the list of profiles
                </Link>
              </li>
            </ul>
          </div>
        )}
      </Sidebar>
    </>
  );
};
export default ProfilePage;

export const getServerSideProps = async (context: any) => {
  const slug = context.query.slug.toLowerCase();
  const profile = await prisma.profile.findUnique({
    where: {
      slug: slug,
    },
  });

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }

  return {
    props: { session, profile },
  };
};
