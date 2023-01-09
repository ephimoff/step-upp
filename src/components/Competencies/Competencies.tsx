import { FieldArray, useFormikContext } from 'formik';
import { MouseEvent, useState } from 'react';
import InputAndLabel from '../InputAndLabel';
import Skills from './Skills';
import Card from '../Card';
import { CompetencyType } from '@/types/types';
import CustomButton from '../CustomButton';

import { MdDelete } from 'react-icons/md';

const Competencies = ({ competenciesArrayHelpers }: any) => {
  const [name, setName] = useState('');
  const { values } = useFormikContext<any>();

  const handleAddCompetency = () => {
    const competency: CompetencyType = {
      name: '',
      skills: [],
    };
    competency.name = name;
    competency.skills = [{ name: '' }, { name: '' }, { name: '' }];

    competenciesArrayHelpers.push(competency);
    setName('');
  };
  const handleRemoveCompetency = (index: number) => {
    competenciesArrayHelpers.remove(index);
  };

  return (
    <>
      <CustomButton text={'+ Add competency'} onClick={handleAddCompetency} />

      {values.competencies.map((competency: CompetencyType, index: number) => (
        <Card key={index}>
          <h1 className="text-xl text-purple-400">
            {values.competencies[index].name
              ? values.competencies[index].name
              : 'Create a new competency'}
          </h1>
          <InputAndLabel
            label={'Competency'}
            placeholder={'Product Strategy'}
            name={`competencies.${index}.name`}
            type={'input'}
            required={true}
          />
          <FieldArray name={`competencies[${index}].skills`}>
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
            className="mx-auto flex items-center text-sm font-bold text-red-700 hover:text-red-500"
            onClick={() => handleRemoveCompetency(index)}
          >
            <span>Remove</span> <MdDelete size={16} />
          </button>
        </Card>
      ))}
    </>
  );
};

export default Competencies;
