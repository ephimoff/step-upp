import { useSession, getSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';
// import { Competency } from '@prisma/client';
import { Formik, Form, FieldArray, useFormikContext, Field } from 'formik';
import ProfileInput from '@/components/ProfileInput';
// import CompetencyInput from '@/components/CompetencyInput';

type Skill = {
  name: string;
};
type Competency = {
  name: string;
  skills: Skill[];
};
const initialValues = {
  comps: [
    {
      name: '',
      skills: [{ name: '' }, { name: '' }, { name: '' }],
    },
  ],
};
const Skills = ({ competencyIndex, skillsArrayHelpers }: any) => {
  const [name, setName] = useState('');
  const { values }: any = useFormikContext();

  const handleAddSkill = () => {
    const skill: Skill = { name };
    skill.name = name;

    skillsArrayHelpers.push(skill);
    setName('');
  };

  const handleRemoveSkill = (index: number) => {
    skillsArrayHelpers.remove(index);
  };

  return (
    <>
      <div>
        <span>Skills: </span>
        <button
          type="button"
          className="rounded-lg bg-gradient-to-r from-fuchsia-700 to-purple-500 px-2 text-sm shadow-md hover:bg-gradient-to-l"
          onClick={handleAddSkill}
        >
          + Add skill
        </button>
      </div>

      {values.comps[competencyIndex].skills.map((skill: any, index: number) => (
        <div key={index} className="">
          {/* <CompetencyInput
            label={`Skill ${index + 1}:`}
            placeholder={'Strategic impact'}
            name={`comps.${competencyIndex}.skills.${index}.name`}
            type={'input'}
            handleRemove={handleRemoveSkill(index)}
          /> */}
          <div className="flex items-baseline py-3">
            <label className="w-1/5 font-thin">{`Skill ${index + 1}:`}</label>
            <div className="w-3/5">
              <Field
                name={`comps.${competencyIndex}.skills.${index}.name`}
                placeholder={'Strategic impact'}
                required
                // className={`w-full rounded-md border bg-slate-700 px-2 py-1 ${
                //   meta.touched && meta.error
                //     ? 'border-2 border-[#fc8181]'
                //     : 'border-gray-500'
                // }`}
                className={`w-full rounded-md border bg-slate-700 px-2 py-1`}
              />
              {/* {meta.touched && meta.error ? (
          <div className="mt-1 text-sm font-normal text-[#fc8181]">
            {errorText}
          </div>
        ) : null} */}
            </div>
            <div className="pl-2">
              <button
                type="button"
                className=""
                onClick={() => handleRemoveSkill(index)}
              >
                x
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const Competencies = ({ compsArrayHelpers }: any) => {
  const [name, setName] = useState('');
  const { values } = useFormikContext();

  const handleAddCompetency = () => {
    const competency: Competency = {
      name: '',
      skills: [],
    };
    competency.name = name;
    competency.skills = [
      { name: 'skill 1' },
      { name: 'skill 2' },
      { name: 'skill 3' },
    ];

    compsArrayHelpers.push(competency);
    setName('');
  };
  const handleRemoveCompetency = (index: number) => {
    compsArrayHelpers.remove(index);
  };

  return (
    <>
      <button
        type="button"
        className="rounded-lg bg-gradient-to-r from-fuchsia-700 to-purple-500 p-2 shadow-md hover:bg-gradient-to-l"
        onClick={handleAddCompetency}
      >
        + Add competency
      </button>

      {values.comps.map((competency: any, index: number) => (
        <section
          className="my-10  grid rounded-xl bg-slate-900 py-4 px-6 drop-shadow-2xl "
          key={index}
        >
          <h1 className="text-xl">
            {values.comps[index].name
              ? values.comps[index].name
              : 'Create a new competency'}
          </h1>
          <ProfileInput
            label={'Competency'}
            placeholder={'Product Strategy'}
            name={`comps.${index}.name`}
            type={'input'}
          />
          <FieldArray name={`comps[${index}].skills`}>
            {(arrayHelpers) => (
              <>
                <Skills
                  competencyIndex={index}
                  skillsArrayHelpers={arrayHelpers}
                />
              </>
            )}
          </FieldArray>

          <button
            type="button"
            className="mx-auto w-1/4 text-xs text-red-800"
            onClick={() => handleRemoveCompetency(index)}
          >
            Remove
          </button>
        </section>
      ))}
    </>
  );
};

export default function CompetenciesPage() {
  const { data: session, status } = useSession();
  const [competencies, setCompetencies] = useState<Competency[] | null>([]);

  useEffect(() => {
    const fetchCompetencies = async () => {
      const res = await fetch(`/api/competency`);
      const competencies = await res.json();
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
                  console.log(values);
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
              {/* <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  console.log(values);
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
                                <h1>
                                  {values.comps[index].name
                                    ? values.comps[index].name
                                    : 'Create a new competency'}
                                </h1>
                                <ProfileInput
                                  label={'Competency'}
                                  placeholder={'Product Strategy'}
                                  name={`comps.${index}.name`}
                                  type={'input'}
                                />

                                <h2>Skills</h2>
                                {comp.skills.map((_, skillIndex) => (
                                  <ProfileInput
                                    label={`Skill ${skillIndex + 1}:`}
                                    placeholder={'Strategic impact'}
                                    name={`comps.${index}.skills.${skillIndex}.name`}
                                    type={'input'}
                                  />
                                ))}

                                <div>
                                  <button
                                    type="button"
                                    className="rounded-lg bg-gradient-to-r from-red-900 to-fuchsia-800 p-2 shadow-md hover:bg-gradient-to-l"
                                    onClick={() => {
                                      insert(index, { name: '' });
                                    }}
                                  >
                                    +
                                  </button>
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
              </Formik> */}
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
