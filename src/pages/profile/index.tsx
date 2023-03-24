import type { GetServerSidePropsContext } from 'next';
import type { MembershipType } from '@/types/types';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Sidebar from '@/components/Sidebar/Sidebar';
import Search from '@/components/Search';
import SearchResults from '@/components/SearchResults';
import Spinner from '@/components/Spinner';
import prisma from '@/utils/prisma';

interface Profile {
  name: string;
  id: string;
  slug: string;
  team: string;
  title: string;
  email: string;
  userpic: string;
}

interface Props {
  profile: any;
  membership: MembershipType[];
  allProfiles: Profile[];
}

export default function MainProfile({
  profile,
  membership,
  allProfiles,
}: Props) {
  const [searchResults, setSearchResults] = useState<Profile[]>(allProfiles);
  const [loading, setLoading] = useState(false);

  const { status } = useSession();
  const searchProfiles = (results: Profile[]) => {
    setLoading(true);
    setSearchResults(results);
    setLoading(false);
  };
  const showAll = () => {
    setSearchResults(allProfiles);
  };
  // console.log('membership', membership[0].workspaceId);
  const role = membership[0].role;
  return (
    <>
      <Sidebar name={profile.name} role={role}>
        {status === 'authenticated' ? (
          <>
            <Search
              returnSearchResults={searchProfiles}
              showAll={showAll}
              workspaceId={membership[0].workspaceId}
            />
            {loading ? <Spinner /> : <SearchResults profiles={searchResults} />}
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
  const PAGE = 'Profile Slug';
  if (!session) {
    console.info(
      `${PAGE} page - Session not found. Redirecting to /auth/signin`
    );
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }
  console.info(`${PAGE} page - Session found: `, session);

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
    console.info(`${PAGE} page - Profile not found. Redirecting to /account`);
    return {
      redirect: {
        destination: '/account',
      },
    };
  }
  // console.log('profile', profile.user.membership);
  const workspaceId = profile.user.membership[0].workspaceId;
  // console.log('workspaceId', workspaceId);
  let allProfiles = await prisma.profile.findMany({
    where: {
      user: {
        membership: { some: { workspaceId: workspaceId } },
      },
    },
    // include: {
    //   user: { include: { membership: true } },
    // },
    select: {
      name: true,
      id: true,
      slug: true,
      team: true,
      title: true,
      email: true,
      userpic: true,
    },
    orderBy: { name: 'asc' },
    take: 10,
  });
  // console.log('===');
  // console.dir(allProfiles, { depth: null });
  // console.log('===');
  const membership = profile.user.membership;
  console.info(`${PAGE} page - Profile found`);
  console.debug(`${PAGE} page - Profile: `, profile);
  // a hack to deal with the serialising the date objects
  profile = JSON.parse(JSON.stringify(profile));
  allProfiles = JSON.parse(JSON.stringify(allProfiles));
  return {
    props: { session, profile, membership, allProfiles },
  };
};
