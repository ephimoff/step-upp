import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Search from '@/components/Search';
import SearchResults from '@/components/SearchResults';
import Spinner from '@/components/Spinner';
import prisma from '@/utils/prisma';
import { useState } from 'react';
import type { GetServerSidePropsContext } from 'next';

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
  allProfiles: Profile[];
}

export default function MainProfile({ profile, allProfiles }: Props) {
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
  return (
    <>
      <Sidebar name={profile.name}>
        {status === 'authenticated' ? (
          <>
            <Search returnSearchResults={searchProfiles} showAll={showAll} />
            {loading ? <Spinner /> : <SearchResults profiles={searchResults} />}
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
  const PAGE = 'Profile Slug';
  const session = await getSession(context);
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

  const profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email as string,
    },
  });
  const allProfiles = await prisma.profile.findMany({
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

  if (!profile) {
    console.info(`${PAGE} page - Profile not found. Redirecting to /account`);
    return {
      redirect: {
        destination: '/account',
      },
    };
  }
  console.info(`${PAGE} page - Profile found: `, profile);

  return {
    props: { session, profile, allProfiles },
  };
};
