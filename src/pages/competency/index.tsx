import type {
  MembershipType,
  ProfileType,
  CompetencyType,
} from '@/types/types';
import type { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { useRouter } from 'next/router';
import { log } from 'next-axiom';
import { fetcher } from '@/utils/fetch';
import Sidebar from '@/components/Sidebar/Sidebar';
import Competencies from '@/components/Competencies/Competencies';
import CompetenciesList from '@/components/Competencies/CompetenciesList';
import CustomButton from '@/components/CustomButton';
import prisma from '@/utils/prisma';
import CompetencyPacks from '@/components/Competencies/CompetencyPacks';
import Card from '@/components/Card';

type Props = {
  profile: ProfileType;
  membership: MembershipType[];
  competencies: CompetencyType[];
};

const initialValues = {
  competencies: [],
};

export default function CompetenciesPage({
  profile,
  membership,
  competencies,
}: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [success, setSuccess] = useState(false);
  const enabledPacks = membership[0].workspace.packs;

  const refreshData = () => {
    router.replace(router.asPath);
  };

  // const createCompetency = async (values: any) => {
  //   const url = '/api/competency';
  //   const method = 'POST';
  //   const functionName = 'submitScore';
  //   log.info(
  //     `${functionName} function -  ${method} ${url} attempting to create a competency`
  //   );
  //   try {
  //     const response = await fetch(url, {
  //       method: method,
  //       body: JSON.stringify({
  //         competencyData: values.competencies,
  //         workspaceId: membership[0].workspaceId,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     log.info(
  //       `${functionName} function -  ${method} ${url} response: ${response.status}`
  //     );
  //     if (response.status < 300) {
  //       setSuccess(true);
  //       refreshData();
  //     }
  //     const jsonResponse = await response.json();
  //   } catch (error) {
  //     log.error(`${functionName} function - ${method} ${url} error: ${error}`);
  //   }
  // };

  const createCompetency = async (values: any) => {
    const response = await fetcher(
      'createCompetency',
      `/api/competency`,
      'POST',
      {
        competencyData: values.competencies,
        workspaceId: membership[0].workspaceId,
      }
    );
    if (response) {
      setSuccess(true);
      refreshData();
    }
    return response;
  };

  // const markPackEnabled = async (id: Number) => {
  //   const functionName = 'markPackEnabled';
  //   const url = '/api/pack';
  //   const method = 'POST';
  //   try {
  //     const response = await fetch(url, {
  //       method: method,
  //       body: JSON.stringify({
  //         id: id,
  //         workspaceId: membership[0].workspaceId,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     log.info(
  //       `${functionName} function -  ${method} ${url} response: ${response.status}`
  //     );
  //     if (response.status < 300) {
  //       setSuccess(true);
  //       refreshData();
  //     }
  //     const jsonResponse = await response.json();
  //   } catch (error) {
  //     log.error(`${functionName} function - ${method} ${url} error: ${error}`);
  //   }
  // };
  const markPackEnabled = async (id: number) => {
    const response = await fetcher('markPackEnabled', `/api/pack`, 'POST', {
      id: id,
      workspaceId: membership[0].workspaceId,
    });
    if (response) {
      setSuccess(true);
      refreshData();
    }
    return response;
  };

  const role = membership[0].role;
  return (
    <>
      <Sidebar name={profile.name} role={role}>
        {status === 'authenticated' ? (
          <div className="">
            <Card>
              <h1 className="mb-4 text-2xl text-purple-600">
                Competencies management
              </h1>
              <p>
                Each Competency has a name and one ore more Skills attach to it.
              </p>
              <p>
                Here you can create Competencies and Skills in bulk. After
                creation, all of these will be available to use with profiles.
              </p>
              <CompetencyPacks
                createCompetency={createCompetency}
                markPackEnabled={markPackEnabled}
                enabledPacks={enabledPacks}
              />
            </Card>

            <CompetenciesList competencies={competencies} />
            <div>
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  createCompetency(values);
                  setSubmitting(false);
                  // resetForm();
                }}
              >
                {({ values, isSubmitting, resetForm }) => (
                  <Form onChange={(event) => {}}>
                    <>
                      <div>
                        <FieldArray name="competencies">
                          {(arrayHelpers) => {
                            return (
                              <>
                                <Competencies
                                  competenciesArrayHelpers={arrayHelpers}
                                />
                              </>
                            );
                          }}
                        </FieldArray>
                      </div>
                      {values.competencies.length > 0 ? (
                        <div className="mb-6 flex items-center">
                          <CustomButton
                            type="submit"
                            text="Submit"
                            role="primary"
                          />
                          {success ? (
                            <span className="animate-fade-out text-purple-500 opacity-0">
                              Submitted successfully
                            </span>
                          ) : null}
                        </div>
                      ) : null}

                      <pre className="text-sm font-thin text-white">
                        {JSON.stringify(values, null, 2)}
                      </pre>
                    </>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
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
  const PAGE = 'Competencies';
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    log.warn(`${PAGE} page - Session not found. Redirecting to Sing In page`);
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }

  let profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email as string,
    },
    include: {
      user: {
        include: {
          membership: { include: { workspace: { include: { packs: true } } } },
        },
      },
    },
  });

  if (!profile) {
    log.warn(`${PAGE} page - Profile not found. Redirecting to Account page`);

    return {
      redirect: {
        destination: '/account',
      },
    };
  }
  log.info(`${PAGE} page - Profile found`);
  log.debug(`${PAGE} page - Profile: `, profile);

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

  let competencies = await prisma.competency.findMany({
    where: {
      workspaceId: membership[0].workspaceId,
    },
    include: {
      skills: {
        select: {
          name: true,
        },
      },
    },
  });

  // a hack to deal with the serialising the date objects
  profile = JSON.parse(JSON.stringify(profile));
  membership = JSON.parse(JSON.stringify(membership));
  competencies = JSON.parse(JSON.stringify(competencies));

  return {
    props: { session, profile, membership, competencies },
  };
};
