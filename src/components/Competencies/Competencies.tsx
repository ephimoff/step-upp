import { FieldArray, useFormikContext } from 'formik';
import { useState } from 'react';
import InputAndLabel from '../InputAndLabel';
import Skills from './Skills';

import { MdDelete } from 'react-icons/md';

type Skill = {
  name: string;
};
type Competency = {
  name: string;
  skills: Skill[];
};

const Competencies = ({ compsArrayHelpers }: any) => {
  const [name, setName] = useState('');
  const { values } = useFormikContext<any>();

  const handleAddCompetency = () => {
    const competency: Competency = {
      name: '',
      skills: [],
    };
    competency.name = name;
    competency.skills = [{ name: '' }, { name: '' }, { name: '' }];

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
          <h1 className="text-xl text-purple-400">
            {values.comps[index].name
              ? values.comps[index].name
              : 'Create a new competency'}
          </h1>
          <InputAndLabel
            label={'Competency'}
            placeholder={'Product Strategy'}
            name={`comps.${index}.name`}
            type={'input'}
            required={true}
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
            className="mx-auto flex w-1/4 items-center text-sm font-bold text-red-700 hover:text-red-500"
            onClick={() => handleRemoveCompetency(index)}
          >
            <span>Remove</span> <MdDelete size={16} />
          </button>
        </section>
      ))}
    </>
  );
};

export default Competencies;
