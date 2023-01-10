import { CompetencyType, ProfileType } from '@/types/types';
import { useEffect, useState } from 'react';
import CustomButton from '../CustomButton';
import Dropdown from '../Dropdown';
import Spinner from '../Spinner';

const empty = [{ id: 'none', name: 'Choose competency' }];

interface CompetencyOption extends CompetencyType {
  id: string;
  name: string;
  unavailable: boolean;
}

type ProfileCompetenciesLoadingProps = {
  profile: ProfileType;
  competencies: CompetencyOption[];
};

const ProfileCompetenciesLoading = ({
  profile,
  competencies,
}: ProfileCompetenciesLoadingProps) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(empty[0]);
  const [error, setError] = useState('');
  // console.log('competencies', competencies);

  function handleSelected(value: any) {
    setSelected(value);
  }
  function updateAvailability(id: string) {
    const competencyIndex = competencies.findIndex(
      (element) => element.id === id
    );
    competencies[competencyIndex].unavailable = true;
  }
  const assignScores = async (profileId: string, skills: any) => {
    if (skills.length === 0) {
      return setError('Please choose one of the competencies to assign');
    }

    try {
      skills.map(async (skill: any) => {
        const response = await fetch('/api/score', {
          method: 'POST',
          body: JSON.stringify({ profileId: profileId, skillId: skill.id }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const jsonResponse = await response.json();
      });
    } catch (error) {
      console.error(error);
    }
  };
  const assignCompetency = async (competencyId: string, profileId: string) => {
    if (competencyId === 'none') {
      return setError('Please choose one of the competencies to assign');
    }
    setError('');
    const newRecord = {
      competencyId: competencyId,
      profileId: profileId,
    };
    try {
      setLoading(true);
      const response = await fetch('/api/assigncompetency', {
        method: 'POST',
        body: JSON.stringify(newRecord),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonResponse = await response.json();
      updateAvailability(competencyId);
      const skillsArray = competencies.find(
        (element) => element.id === competencyId
      );
      assignScores(profileId, skillsArray?.skills);
      // console.log(competencies.find((element) => element.id === competencyId));
      setLoading(false);
      return newRecord;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <Dropdown
              options={competencies}
              selected={selected}
              setSelected={handleSelected}
            />
          </div>
          <div>
            <CustomButton
              text={'Assign'}
              onClick={() => assignCompetency(selected.id, profile.id)}
            />
          </div>
          <div className="text-sm text-red-600">{error ? error : null}</div>
        </>
      )}
    </div>
  );
};
export default ProfileCompetenciesLoading;
