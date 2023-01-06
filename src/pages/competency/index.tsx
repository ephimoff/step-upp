import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import Competencies from '@/components/Competencies/Competencies';
import { Competency } from '@prisma/client';

const initialValues = {
  comps: [
    {
      name: '',
      skills: [{ name: '' }, { name: '' }, { name: '' }],
    },
  ],
};

export default function CompetenciesPage() {
  const { data: session, status } = useSession();
  const [competencies, setCompetencies] = useState<Competency[] | null>([]);

  useEffect(() => {
    const fetchCompetencies = async () => {
      const res = await fetch(`/api/competency`);
      const competencies: Competency[] = await res.json();
      // console.log('competencies:', competencies);
      if (res.status === 200) {
        setCompetencies(competencies);
      } else {
        setCompetencies([]);
      }
    };
    fetchCompetencies();
  }, []);
  return (
    <>
      <Sidebar>
        {status === 'authenticated' ? (
          <div className="mx-auto h-full sm:w-full md:w-3/5">
            <h1 className="text-2xl">Competencies management</h1>
            <p>
              Each Competency has a name and one ore more Skills attach to it.
            </p>
            <p>
              Here you can create Competencies and Skills in bulk. After
              creation, all of these will be available to use with profiles.
            </p>
            <div>
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  // console.log(values);
                }}
              >
                {({ values }) => (
                  <Form onChange={(event) => {}}>
                    <div>
                      <FieldArray name="comps">
                        {(arrayHelpers) => {
                          return (
                            <>
                              <Competencies compsArrayHelpers={arrayHelpers} />
                            </>
                          );
                        }}
                      </FieldArray>
                    </div>
                    <button
                      className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-2 shadow-md hover:bg-gradient-to-l"
                      type="submit"
                    >
                      Save all
                    </button>
                    <pre className="text-sm font-thin text-white">
                      {JSON.stringify(values, null, 2)}
                    </pre>
                  </Form>
                )}
              </Formik>
            </div>

            <div>
              {competencies && competencies.length > 0 ? (
                competencies?.map((competency, index) => {
                  return <div>{competency.name}</div>;
                })
              ) : (
                <div>No competencies found</div>
              )}
            </div>
          </div>
        ) : (
          <p>You are not signed in</p>
        )}
      </Sidebar>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }
  return {
    props: { session },
  };
};
