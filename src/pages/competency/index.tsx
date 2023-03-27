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

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function createCompetency(values: any) {
    let url = '/api/competency';
    let method = 'POST';
    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({
          competencyData: values.competencies,
          workspaceId: membership[0].workspaceId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status < 300) {
        setSuccess(true);
        refreshData();
      }
      const jsonResponse = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  const role = membership[0].role;
  return (
    <>
      <Sidebar name={profile.name} role={role}>
        {status === 'authenticated' ? (
          <div className="">
            <h1 className="text-2xl">Competencies management</h1>
            <Card>
              <p>
                Each Competency has a name and one ore more Skills attach to it.
              </p>
              <p>
                Here you can create Competencies and Skills in bulk. After
                creation, all of these will be available to use with profiles.
              </p>
              <CompetencyPacks />
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

                      {/* <pre className="text-sm font-thin text-white">
                        {JSON.stringify(values, null, 2)}
                      </pre> */}
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
    console.info(
      `[INFO] ${PAGE} page - Session not found. Redirecting to Sing in page`
    );
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
          membership: true,
        },
      },
    },
  });

  if (!profile) {
    console.info(
      `[INFO] ${PAGE} page - Profile not found. Redirecting to Account page`
    );

    return {
      redirect: {
        destination: '/account',
      },
    };
  }
  console.info(`[INFO] ${PAGE} page - Profile found`);
  console.debug(`[DEBUG] ${PAGE} page - Profile: `, profile);

  let membership = profile.user.membership;

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
