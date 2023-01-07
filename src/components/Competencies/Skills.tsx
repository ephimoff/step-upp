import { Field, useFormikContext } from 'formik';
import { useState } from 'react';
import CustomButton from '../CustomButton';
import { SkillType } from '@/types/competencyTypes';

const Skills = ({ competencyIndex, skillsArrayHelpers }: any) => {
  const [name, setName] = useState('');
  const { values }: any = useFormikContext();

  const handleAddSkill = () => {
    const skill: SkillType = { name };
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
      </div>

      {values.competencies[competencyIndex].skills.map(
        (skill: SkillType, index: number) => (
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
