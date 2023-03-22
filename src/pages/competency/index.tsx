import type { MembershipType, ProfileType } from '@/types/types';
import type { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import Sidebar from '@/components/Sidebar/Sidebar';
import Competencies from '@/components/Competencies/Competencies';
import CompetenciesList from '@/components/Competencies/CompetenciesList';
import CustomButton from '@/components/CustomButton';
import prisma from '@/utils/prisma';

type Props = {
  profile: ProfileType;
  membership: MembershipType[];
};

const initialValues = {
  competencies: [],
};

export default function CompetenciesPage({ profile, membership }: Props) {
  const { data: session, status } = useSession();
  // const [btnClicked, setBtnClicked] = useState('');
  const [success, setSuccess] = useState(false);

  async function createCompetency(values: any) {
    let url = '/api/competency';
    let method = 'POST';
    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(values.competencies),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setSuccess(true);
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
            <p>
              Each Competency has a name and one ore more Skills attach to it.
            </p>
            <p>
              Here you can create Competencies and Skills in bulk. After
              creation, all of these will be available to use with profiles.
            </p>
            <CompetenciesList />
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
  // const session = await getSession(context);
  const session = await getServerSession(req, res, authOptions);
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
    include: {
      user: {
        include: {
          membership: true,
        },
      },
    },
  });

  if (!profile) {
    return {
      redirect: {
        destination: '/account',
      },
    };
  }
  const membership = profile.user.membership;
  return {
    props: { session, profile, membership },
  };
};
