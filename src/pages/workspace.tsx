import type { GetServerSidePropsContext } from 'next';
import type { MembershipType } from '@/types/types';
import type { WorkspaceAccess } from '@prisma/client';
import { Trash, AtSign, Plus, User } from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { string } from 'yup';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { log } from 'next-axiom';
import { fetcher } from '@/utils/fetch';
import { useSession } from 'next-auth/react';
import { searchPerPage } from '@/data/data';
import Sidebar from '@/components/Sidebar/Sidebar';
import prisma from '@/utils/prisma';
import Card from '@/components/Card';
import FormikForm from '@/components/FormikForm';
import Modal from '@/components/Modal';
import Search from '@/components/Search';
import Spinner from '@/components/Spinner';
import OwnershipSearchResults from '@/components/OwnershipSearchResults';
import SearchResults from '@/components/SearchResults';
import Pagination from '@/components/Pagination';

interface Profile {
  name: string;
  id: string;
  slug: string;
  team: string;
  title: string;
  email: string;
  userpic: string;
  user: {
    id: string;
    membership: {
      role: 'OWNER' | 'MEMBER';
      workspaceId: string;
    }[];
  };
}

type Props = {
  profile: any;
  membership: MembershipType[];
  access: WorkspaceAccess[];
  owners: Profile[];
};

const WorkspacePage = ({
  profile,
  membership,
  access: domains,
  owners,
}: Props) => {
  const router = useRouter();

  let [isDomainModalOpen, setDomainModalOpen] = useState(false);
  let [isOwnerModalOpen, setOwnerModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { status } = useSession();

  const searchProfiles = (results: Profile[], count: number) => {
    setSearchResults(results);
    setResultsCount(Number(count));
    setLoading(false);
  };
  // const showAll = useCallback(() => {
  //   setSearchResults(allProfiles);
  // }, [allProfiles]);
  // useEffect(() => showAll(), [showAll, allProfiles]);
  function closeDomainModal() {
    setDomainModalOpen(false);
  }
  function openDomainModal() {
    setDomainModalOpen(true);
  }
  function closeOwnerModal() {
    setOwnerModalOpen(false);
  }
  function openOwnerModal() {
    setOwnerModalOpen(true);
  }

  const refreshData = () => {
    router.replace(router.asPath);
  };
  const workspace = {
    id: membership[0].workspace.id,
    name: membership[0].workspace.name,
    description: membership[0].workspace.description,
  };
  const plan = {
    id: membership[0].workspace.plan.id,
    name: membership[0].workspace.plan.name,
  };
  const role = membership[0].role;

  const aboutFields = [
    {
      name: 'workspace',
      label: 'Workspace',
      value: workspace.name,
      type: string().required('Workspace name is required'),
    },
    {
      name: 'description',
      label: 'Description',
      value: workspace.description || '',
      type: string(),
    },
  ];

  // const updateWorkspace = async (values: any) => {
  //   const functionName = 'updateWorkspace';
  //   const url = '/api/workspace';
  //   const method = 'PUT';
  //   try {
  //     const response = await fetch(url, {
  //       method: method,
  //       body: JSON.stringify({
  //         id: workspace.id,
  //         name: values.workspace,
  //         description: values.description,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     log.info(
  //       `${functionName} function -  ${method} ${url} response: ${response.status}`
  //     );
  //     return response;
  //   } catch (error) {
  //     log.error(`${functionName} function - ${method} ${url} error: ${error}`);
  //   }
  // };
  const updateWorkspace = async (values: any) => {
    const response = await fetcher('updateWorkspace', `/api/workspace`, 'PUT', {
      id: workspace.id,
      name: values.workspace,
      description: values.description,
    });
    return response;
  };

  // const updateDomain = async (domain: string, isActive: boolean) => {
  //   const functionName = 'updateDomain';
  //   const url = '/api/workspaceaccess';
  //   const method = 'PUT';
  //   try {
  //     const response = await fetch(url, {
  //       method: method,
  //       body: JSON.stringify({
  //         domain: domain,
  //         isActive: isActive,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     log.info(
  //       `${functionName} function -  ${method} ${url} response: ${response.status}`
  //     );
  //     if (response.status < 300) {
  //       refreshData();
  //     }
  //     const jsonResponse = await response.json();
  //   } catch (error) {
  //     log.error(`${functionName} function - ${method} ${url} error: ${error}`);
  //   }
  // };
  const updateDomain = async (domain: string, isActive: boolean) => {
    const response = await fetcher(
      'updateDomain',
      `/api/workspaceaccess`,
      'PUT',
      {
        domain: domain,
        isActive: isActive,
      }
    );
    if (response) {
      refreshData();
    }
    return response;
  };

  // const updateAccess = async (
  //   profileId: string,
  //   userId: string,
  //   role: 'OWNER' | 'MEMBER'
  // ) => {
  //   const functionName = 'updateAccess';
  //   const url = `/api/profile?updateMembership=true`;
  //   const method = 'PUT';
  //   try {
  //     const response = await fetch(url, {
  //       method: method,
  //       body: JSON.stringify({
  //         profileId: profileId,
  //         userId: userId,
  //         workspaceId: workspace.id,
  //         role: role,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     log.info(
  //       `${functionName} function -  ${method} ${url} response: ${response.status}`
  //     );
  //     if (response.status < 300) {
  //       log.debug(
  //         `${functionName} function - ${method} ${url} response: `,
  //         response
  //       );
  //       refreshData();
  //     }
  //     return response;
  //   } catch (error) {
  //     log.error(`${functionName} function - ${method} ${url} error: ${error}`);
  //   }
  // };

  const updateOwnership = async (
    profileId: string,
    userId: string,
    role: 'OWNER' | 'MEMBER'
  ) => {
    const response = await fetcher(
      'updateOwnership',
      `/api/profile?updateOwnership=true`,
      'PUT',
      {
        profileId: profileId,
        userId: userId,
        workspaceId: workspace.id,
        role: role,
      }
    );
    if (response) {
      refreshData();
    }
    return response;
  };
  return (
    <>
      <Sidebar name={profile.name} role={role}>
        <Card>
          <h1 className="mb-4 text-2xl text-purple-600">Workspace</h1>
          <div className="mt-10 mb-4">
            <h2 className="mb-2 text-lg">About</h2>
            <FormikForm fields={aboutFields} onSubmit={updateWorkspace} />
          </div>

          <div className="mt-10 mb-4">
            <h2 className="mb-2 text-lg">Plan</h2>
            <div>
              <span className="mr-4 rounded-lg bg-purple-600 px-4 py-1 text-white">
                {plan.name}
              </span>
              <button className="text-sm font-thin text-gray-500  hover:underline dark:text-gray-300">
                Upgrade
              </button>
            </div>
          </div>

          <div className="mt-10 mb-4">
            <h2 className="mb-2 text-lg">Access</h2>
            <p className="text-sm font-thin text-gray-400">
              When anyone with an email address from these domains joins
              StepUpp, they will automatically join this workspace. It is
              recommended to avoid removing domains from this list since
              otherwise new users from these domains will be added to a separate
              new free workspace.
            </p>
            <div className="my-8 text-sm">
              {domains.map(({ domain, isActive, isPublic }, index) => {
                if (domain) {
                  if (isActive && !isPublic) {
                    return (
                      <div
                        key={index}
                        className="itens-center flex justify-between "
                      >
                        <div className="flex items-center">
                          <AtSign
                            size={20}
                            strokeWidth={3}
                            className="mr-2 text-gray-300 dark:text-gray-700"
                          />
                          <span>{domain}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => updateDomain(domain, false)}
                        >
                          <Trash size={16} className="text-red-700" />
                        </button>
                      </div>
                    );
                  }
                }
              })}
            </div>
            <div className="">
              <button
                className="flex items-center font-semibold text-purple-600"
                onClick={openDomainModal}
              >
                <Plus size={16} strokeWidth={4} /> Add domain
              </button>
              <Modal closeModal={closeDomainModal} isOpen={isDomainModalOpen}>
                <div>
                  <p className="mb-4 text-sm">
                    You can only add work domains of users who signed up and are
                    part of your workspace.
                  </p>
                  <div className="my-8">
                    {domains.map(({ domain, isActive, isPublic }, index) => {
                      if (!isActive && !isPublic) {
                        return (
                          <div
                            key={index}
                            className="itens-center flex justify-between "
                          >
                            <div className="flex items-center">
                              <AtSign
                                size={20}
                                strokeWidth={3}
                                className="mr-2 text-gray-300 dark:text-gray-700"
                              />
                              <span>{domain}</span>
                            </div>

                            <button
                              className="flex items-center font-semibold text-purple-600"
                              onClick={() => updateDomain(domain, true)}
                            >
                              <Plus size={16} strokeWidth={4} /> Add
                            </button>
                          </div>
                        );
                      }
                    })}
                  </div>
                  <p className="text-xs text-gray-500">
                    To add another domain, promote someone from that domain to
                    be an Admin in your workspace and ask them to visit this
                    page.
                  </p>
                </div>
              </Modal>
            </div>
          </div>
          <div className="mt-10 mb-4">
            <h2 className="mb-2 text-lg">Ownership</h2>
            <p className="text-sm font-thin text-gray-400">
              People specified below will have the owner permissions and will be
              able to manage the workspace
            </p>
            <div className="my-8 text-sm">
              {owners.map((p, index) => {
                if (p.user.membership[0].role === 'OWNER') {
                  return (
                    <div
                      key={index}
                      className="itens-center mb-4 flex justify-between "
                    >
                      <div className="flex items-center">
                        <User
                          size={20}
                          strokeWidth={3}
                          className="mr-2 text-gray-300 dark:text-gray-700"
                        />
                        <span>{p.name}</span>
                      </div>
                      {p.id !== profile.id && (
                        <button
                          type="button"
                          onClick={() =>
                            updateOwnership(p.id, p.user.id, 'MEMBER')
                          }
                        >
                          <Trash size={16} className="text-red-700" />
                        </button>
                      )}
                    </div>
                  );
                }
              })}
            </div>
            <div>
              <button
                className="flex items-center font-semibold text-purple-600"
                onClick={openOwnerModal}
              >
                <Plus size={16} strokeWidth={4} /> Add owner
              </button>
              <Modal
                closeModal={closeOwnerModal}
                isOpen={isOwnerModalOpen}
                size="xl"
              >
                <div>
                  <h2>
                    Turn on the toggle to make the employee an owner of the
                    workspace
                  </h2>
                  <Search
                    returnSearchResults={searchProfiles}
                    workspaceId={membership[0].workspaceId}
                    page={currentPage}
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
                      <OwnershipSearchResults
                        profileId={profile.id}
                        profiles={searchResults}
                        updateAccess={updateOwnership}
                      />
                      {resultsCount > searchPerPage && (
                        <Pagination
                          resultsCount={resultsCount}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                        />
                      )}
                    </div>
                  )}
                </div>
              </Modal>
            </div>
          </div>
        </Card>
      </Sidebar>
    </>
  );
};
export default WorkspacePage;

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);
  const PAGE = 'Workspace';

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
          membership: {
            include: { workspace: { include: { plan: true, access: true } } },
          },
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

  let owners = await prisma.profile.findMany({
    where: {
      user: {
        membership: {
          some: { workspaceId: workspaceId },
          every: { role: 'OWNER' },
        },
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
      user: {
        select: {
          id: true,
          membership: { select: { role: true, workspaceId: true } },
        },
      },
    },
    orderBy: { name: 'asc' },
    // take: 10,
  });

  let membership = profile.user.membership;
  let access = membership[0].workspace.access;

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
  access = JSON.parse(JSON.stringify(access));
  owners = JSON.parse(JSON.stringify(owners));

  return {
    props: { session, profile, membership, access, owners },
  };
};
