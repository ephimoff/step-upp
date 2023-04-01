import type { GetServerSidePropsContext } from 'next';
import type { MembershipType } from '@/types/types';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { log } from 'next-axiom';
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
  const session = await getServerSession(req, res, authOptions);
  const PAGE = 'Profile Slug';
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

  const workspaceId = profile.user.membership[0].workspaceId;

  let allProfiles = await prisma.profile.findMany({
    where: {
      user: {
        membership: { some: { workspaceId: workspaceId } },
      },
    },

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

  let membership = profile.user.membership;

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
  log.info(`${PAGE} page - Profile found`);
  log.debug(`${PAGE} page - Profile: `, profile);

  // a hack to deal with the serialising the date objects
  profile = JSON.parse(JSON.stringify(profile));
  membership = JSON.parse(JSON.stringify(membership));
  allProfiles = JSON.parse(JSON.stringify(allProfiles));
  return {
    props: { session, profile, membership, allProfiles },
  };
};
