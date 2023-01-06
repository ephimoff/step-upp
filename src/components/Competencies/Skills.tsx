import { Field, useFormikContext } from 'formik';
import { useState } from 'react';

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

export default Skills;
