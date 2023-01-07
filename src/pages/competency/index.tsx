import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import { Formik, Form, FieldArray } from 'formik';
import Competencies from '@/components/Competencies/Competencies';
import CompetenciesList from '@/components/Competencies/CompetenciesList';

const initialValues = {
  competencies: [
    // {
    //   name: '',
    //   skills: [{ name: '' }, { name: '' }, { name: '' }],
    // },
  ],
};

async function createCompetency(values: any) {
  let url = '/api/competency';
  let method = 'POST';
  // console.log('values', values);
  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(values.competencies),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonResponse = await response.json();
    // console.log(jsonResponse);
  } catch (error) {
    console.error(error);
  }
}

export default function CompetenciesPage() {
  const { data: session, status } = useSession();

  return (
    <>
      <Sidebar>
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
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  createCompetency(values);
                  setSubmitting(false);
                }}
              >
                {({ values, isSubmitting }) => (
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
                      {console.log('zzz', values)}
                      <button
                        className={`${
                          isSubmitting && 'opacity-40'
                        } w-full rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-2 shadow-md hover:bg-gradient-to-l`}
                        type="submit"
                      >
                        Save all
                      </button>
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
