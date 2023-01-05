import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';
import { Competency } from '@prisma/client';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import ProfileInput from '@/components/ProfileInput';

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
      console.log('competencies:', competencies);
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
          <>
            <p>Welcome {session.user!.name}</p>
            <p>This is a Competencies page</p>
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  // console.log(values);
                }}
              >
                {({ values }) => (
                  <Form>
                    <FieldArray name="comps">
                      {({ insert, remove, push }) => (
                        <div>
                          <button
                            type="button"
                            className="rounded-lg bg-gradient-to-r from-fuchsia-700 to-purple-500 p-2 shadow-md hover:bg-gradient-to-l"
                            onClick={() =>
                              push({
                                name: '',
                                skills: [
                                  { name: '' },
                                  { name: '' },
                                  { name: '' },
                                ],
                              })
                            }
                          >
                            + Add Competency
                          </button>
                          {values.comps.length > 0 &&
                            values.comps.map((comp, index) => (
                              <section
                                className="my-10 grid rounded-xl bg-slate-900 py-4 px-6 drop-shadow-2xl"
                                key={index}
                              >
                                <div>
                                  <ProfileInput
                                    label={'Competency name'}
                                    placeholder={'Product Strategy'}
                                    name={`comps.${index}.name`}
                                    type={'input'}
                                  />

                                  <h2>Skills</h2>
                                  {comp.skills.map((skill, skillIndex) => (
                                    <div>
                                      <ProfileInput
                                        label={`Skill ${skillIndex + 1}:`}
                                        placeholder={'Strategic impact'}
                                        name={`comps.${index}.skills.${skillIndex}.name`}
                                        type={'input'}
                                      />
                                    </div>
                                  ))}
                                </div>

                                <div>
                                  <button
                                    type="button"
                                    className="rounded-lg bg-gradient-to-r from-red-900 to-fuchsia-800 p-2 shadow-md hover:bg-gradient-to-l"
                                    onClick={() => remove(index)}
                                  >
                                    Remove this competency
                                  </button>
                                </div>
                              </section>
                            ))}
                        </div>
                      )}
                    </FieldArray>
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
          </>
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
