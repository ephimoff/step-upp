import { Field, useFormikContext } from 'formik';
import { useState } from 'react';
import CustomButton from '../CustomButton';
import { SkillType } from '@/types/types';
import { BiTrash } from 'react-icons/bi';

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
      <div className="flex">
        <span className="mr-2 text-sm sm:text-base">Skills</span>
        <CustomButton
          text="Add skill"
          onClick={handleAddSkill}
          role="noborder"
          size={'small'}
          icon="+"
        />
      </div>

      {values.competencies[competencyIndex].skills.map(
        (skill: SkillType, index: number) => (
          <div key={index} className="">
            <div className="flex items-center py-3 ">
              <label className="w-2/6 text-sm font-thin sm:text-base">{`Skill ${
                index + 1
              }:`}</label>
              <div className="w-3/6">
                <Field
                  name={`competencies.${competencyIndex}.skills.${index}.name`}
                  placeholder={'Strategic impact'}
                  required
                  className={`w-full rounded-md border border-gray-400 bg-slate-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-slate-900 sm:text-base`}
                />
              </div>
              <div className="pl-2">
                <button
                  type="button"
                  className="h-6 w-6 text-gray-400 hover:text-red-500"
                  onClick={() => handleRemoveSkill(index)}
                >
                  <BiTrash />
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
