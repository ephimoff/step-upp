import type { GetServerSidePropsContext } from 'next';
import type { MembershipType } from '@/types/types';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { log } from 'next-axiom';
import { searchPerPage } from '@/data/data';
import Sidebar from '@/components/Sidebar/Sidebar';
import Search from '@/components/Search';
import SearchResults from '@/components/SearchResults';
import Spinner from '@/components/Spinner';
import prisma from '@/utils/prisma';
import Pagination from '@/components/Pagination';

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
}

export default function MainProfile({ profile, membership }: Props) {
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // const finalPage = Math.ceil(resultsCount / searchPerPage);
  // const prevPage = Math.max(currentPage - 1, 0);
  // const nextPage = Math.min(currentPage + 1, finalPage);

  const { status } = useSession();
  const searchProfiles = (results: Profile[], count: number) => {
    setSearchResults(results);
    setResultsCount(Number(count));
    setLoading(false);
  };

  // const goToPage = (page: number) => {
  //   console.log('page', page);
  //   setCurrentPage(page);
  // };
  const role = membership[0].role;
  return (
    <>
      <Sidebar name={profile.name} role={role}>
        {status === 'authenticated' ? (
          <>
            <Search
              returnSearchResults={searchProfiles}
              page={currentPage}
              workspaceId={membership[0].workspaceId}
              setCurrentPage={setCurrentPage}
            />

            {loading ? (
              <Spinner />
            ) : (
              <div>
                <p className="my-2 text-xs font-thin text-gray-500">
                  Displaying {searchResults.length} results out of{' '}
                  {resultsCount.toString()}
                </p>
                <SearchResults
                  profiles={searchResults}
                  // count={resultsCount}
                  // perPage={searchPerPage}
                />
                {resultsCount > searchPerPage && (
                  <Pagination
                    resultsCount={resultsCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                )}

                {/* {prevPage}
                {currentPage}
                {nextPage}
                {finalPage} */}
              </div>
            )}
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
  // const { req, res } = context;

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

  // const workspaceId = profile.user.membership[0].workspaceId;

  // let allProfiles = await prisma.profile.findMany({
  //   where: {
  //     user: {
  //       membership: { some: { workspaceId: workspaceId } },
  //     },
  //   },

  //   select: {
  //     name: true,
  //     id: true,
  //     slug: true,
  //     team: true,
  //     title: true,
  //     email: true,
  //     userpic: true,
  //   },
  //   orderBy: { name: 'asc' },
  //   take: searchPerPage,
  //   skip: skip,
  // });
  // let allProfilesCount = await prisma.profile.count({
  //   where: {
  //     user: {
  //       membership: { some: { workspaceId: workspaceId } },
  //     },
  //   },
  // });

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
  // allProfiles = JSON.parse(JSON.stringify(allProfiles));
  return {
    props: { session, profile, membership },
  };
};
