import type { CompetencyType, ProfileType, SkillType } from '@/types/types';
import { useState } from 'react';
import { log } from 'next-axiom';
import Link from 'next/link';
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
  fetchAssignedCompetencies: any;
};

const ProfileCompetenciesLoading = ({
  profile,
  competencies,
  fetchAssignedCompetencies,
}: ProfileCompetenciesLoadingProps) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(empty[0]);
  const [error, setError] = useState('');

  function handleSelected(value: any) {
    setSelected(value);
  }
  function updateAvailability(id: string) {
    const competencyIndex = competencies.findIndex(
      (element) => element.id === id
    );
    competencies[competencyIndex].unavailable = true;
  }
  const assignScores = async (profileId: string, skills: SkillType[]) => {
    const functionName = 'assignScores';
    const url = '/api/score';
    const method = 'POST';
    if (skills.length === 0) {
      return setError('Please choose one of the competencies to assign');
    }

    try {
      skills.map(async (skill: SkillType) => {
        const response = await fetch(url, {
          method: method,
          body: JSON.stringify({ profileId: profileId, skillId: skill.id }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        log.info(
          `${functionName} function -  ${method} ${url} response: ${response.status}`
        );
        const jsonResponse = await response.json();
      });
    } catch (error) {
      log.error(`${functionName} function - ${method} ${url} error: ${error}`);
    }
  };
  const assignCompetency = async (competencyId: string, profileId: string) => {
    const functionName = 'assignCompetency';
    const url = '/api/assigncompetency';
    const method = 'POST';
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
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(newRecord),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      log.info(
        `${functionName} function -  ${method} ${url} response: ${response.status}`
      );
      const jsonResponse = await response.json();
      updateAvailability(competencyId);
      const skillsArray: any = competencies.find(
        (element) => element.id === competencyId
      );
      assignScores(profileId, skillsArray?.skills);
      fetchAssignedCompetencies();
      setLoading(false);
      return newRecord;
    } catch (error) {
      log.error(`${functionName} function - ${method} ${url} error: ${error}`);
    }
  };

  return (
    <div className="mb-10 flex items-center">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {competencies.length > 0 ? (
            <>
              <div className="mr-2">
                <Dropdown
                  options={competencies}
                  selected={selected}
                  setSelected={handleSelected}
                />
              </div>
              <div>
                <CustomButton
                  text="Assign"
                  onClick={() => assignCompetency(selected.id, profile.id)}
                />
              </div>
              <div className="text-sm text-red-600">{error ? error : null}</div>
            </>
          ) : (
            <p>
              No available competencies to assign. To create competencies go to{' '}
              <Link
                href="/competency"
                className="font-semibold text-purple-600 underline"
              >
                Competencies
              </Link>{' '}
              page
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default ProfileCompetenciesLoading;
