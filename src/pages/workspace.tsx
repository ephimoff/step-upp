import type { GetServerSidePropsContext } from 'next';
import type { MembershipType } from '@/types/types';
import type { WorkspaceAccess } from '@prisma/client';
import { Trash, AtSign, Plus } from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { string } from 'yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import prisma from '@/utils/prisma';
import Card from '@/components/Card';
import FormikForm from '@/components/FormikForm';
import Modal from '@/components/Modal';

type Props = {
  profile: any;
  membership: MembershipType[];
  access: WorkspaceAccess[];
};

const WorkspacePage = ({ profile, membership, access: domains }: Props) => {
  const router = useRouter();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
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

  const updateWorkspace = async (values: any) => {
    try {
      const response = await fetch('/api/workspace', {
        method: 'PUT',
        body: JSON.stringify({
          id: workspace.id,
          name: values.workspace,
          description: values.description,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // const jsonResponse = await response.json();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const removeDomain = async (id: string) => {
    try {
      const response = await fetch('/api/workspaceaccess', {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          isActive: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status < 300) {
        refreshData();
      }
      const jsonResponse = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Sidebar name={profile.name} role={role}>
        <Card>
          <h1 className="text-xl">Workspace</h1>
          <div className="mt-10 mb-4">
            <h2 className="text-lg">About</h2>
            <FormikForm fields={aboutFields} onSubmit={updateWorkspace} />
          </div>

          <div className="mt-10 mb-4">
            <h2 className="text-lg">Plan</h2>
            <div>
              <span className="mr-4 rounded-lg bg-purple-600 px-4 py-1 text-white">
                {plan.name}
              </span>
              <button className="text-sm font-thin text-gray-500  hover:underline dark:text-gray-300">
                Upgrade
              </button>
            </div>
          </div>

          <div className="mt-10 mb-4 w-1/2">
            <h2 className="text-lg">Access</h2>
            <p className="text-sm font-thin text-gray-400">
              When anyone with an email address from these domains joins
              StepUpp, they will automatically join this workspace. It is
              recommended to avoid removing domains from this list since
              otherwise new users from these domains will be added to a separate
              new free workspace.
            </p>
            <div className="my-8 text-sm">
              {domains.map(({ domain, id, isActive }, index) => {
                if (domain) {
                  if (isActive) {
                    return (
                      <div
                        key={index}
                        className="itens-center flex justify-between "
                      >
                        <div className="flex items-center">
                          <AtSign className="mr-2 text-gray-300" />
                          <span>{domain}</span>
                        </div>

                        <button type="button" onClick={() => removeDomain(id)}>
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
                onClick={openModal}
              >
                <Plus size={16} strokeWidth={4} /> Add domain
              </button>
              <Modal closeModal={closeModal} isOpen={isOpen}>
                <div>
                  <p className="mb-4 text-sm">
                    This list contains the domains based on user emails.
                  </p>
                  <p className="text-xs text-gray-500">
                    To add another domain, promote someone from that domain to
                    be an Admin in your workspace and ask them to visit this
                    page.
                  </p>
                  <div className="my-8">
                    {domains.map(({ domain, id, isActive }, index) => {
                      if (!isActive) {
                        return (
                          <div
                            key={index}
                            className="itens-center flex justify-between "
                          >
                            <div className="flex items-center">
                              <AtSign className="mr-2 text-gray-300" />
                              <span>{domain}</span>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeDomain(id)}
                            >
                              <Trash size={16} className="text-red-700" />
                            </button>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </Modal>
            </div>
          </div>

          {/* <pre className="text-xs font-thin text-black dark:text-white">
            {JSON.stringify(profile, null, 2)}
          </pre> */}
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
    console.info(
      `${PAGE} page - Session not found. Redirecting to /auth/signin`
    );
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }
  console.info(`${PAGE} page - Session found`);
  console.debug(`${PAGE} page - Session: `, session);

  const profile = await prisma.profile.findUnique({
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
    console.info(`${PAGE} page - Profile not found. Redirecting to /account`);
    return {
      redirect: {
        destination: '/account',
      },
    };
  }
  const membership = profile.user.membership;
  const access = membership[0].workspace.access;
  console.info(`${PAGE} page - Profile found`);
  console.debug(`${PAGE} page - Profile: `, profile);
  // console.log('membership', membership);

  return {
    props: { session, profile, membership, access },
  };
};
