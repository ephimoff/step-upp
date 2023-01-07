import { Field, useFormikContext } from 'formik';
import { MouseEvent, useState } from 'react';
import CustomButton from '../CustomButton';

type Skill = {
  name: string;
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
        <CustomButton
          text={'+ Add skill'}
          onClick={handleAddSkill}
          size={'small'}
        />
        {/* <button
          type="button"
          className="rounded-lg bg-gradient-to-r from-fuchsia-700 to-purple-500 px-2 text-sm shadow-md hover:bg-gradient-to-l"
          onClick={handleAddSkill}
        >
          + Add skill
        </button> */}
      </div>

      {values.competencies[competencyIndex].skills.map(
        (skill: any, index: number) => (
          <div key={index} className="">
            <div className="flex items-baseline py-3">
              <label className="w-1/5 font-thin">{`Skill ${index + 1}:`}</label>
              <div className="w-3/5">
                <Field
                  name={`competencies.${competencyIndex}.skills.${index}.name`}
                  placeholder={'Strategic impact'}
                  required
                  className={`w-full rounded-md border border-gray-500 bg-slate-700 px-2 py-1`}
                />
              </div>
              <div className="pl-2">
                <button
                  type="button"
                  className="h-6 w-5 text-gray-300 hover:text-red-500"
                  onClick={() => handleRemoveSkill(index)}
                >
                  x
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Skills;
