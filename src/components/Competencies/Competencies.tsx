import { FieldArray, useFormikContext } from 'formik';
import { Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { CompetencyType } from '@/types/types';
import InputAndLabel from '../InputAndLabel';
import Skills from './Skills';
import Card from '../Card';
import CustomButton from '../CustomButton';

const Competencies = ({ competenciesArrayHelpers }: any) => {
  const [name, setName] = useState('');
  const { values } = useFormikContext<any>();

  const handleAddCompetency = () => {
    const competency: CompetencyType = {
      name: '',
      skills: [],
      workspaceId: '',
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
      <div className="mb-4">
        <CustomButton
          text="Add competency"
          onClick={handleAddCompetency}
          role="secondary"
          icon={<Plus size={16} strokeWidth={4} />}
        />
      </div>

      {values.competencies.map((competency: CompetencyType, index: number) => (
        <Card key={index}>
          <h1 className="text-purple-600 sm:text-lg md:text-xl">
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
          <div className="flex justify-center">
            <CustomButton
              text="Remove"
              onClick={() => handleRemoveCompetency(index)}
              role="red"
              size={'small'}
              icon={<Trash size={14} />}
              iconAfter
            />
          </div>
        </Card>
      ))}
    </>
  );
};

export default Competencies;
