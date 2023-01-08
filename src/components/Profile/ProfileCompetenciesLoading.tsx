import { CompetencyType } from '@/types/competencyTypes';
import { useEffect, useState } from 'react';
import CustomButton from '../CustomButton';
import Dropdown from '../Dropdown';
import Spinner from '../Spinner';

const empty = [{ id: 'none', name: 'Choose competency' }];

type ProfileCompetenciesLoadingProps = {
  profileId: string;
};

const ProfileCompetenciesLoading = ({
  profileId,
}: ProfileCompetenciesLoadingProps) => {
  const [loading, setLoading] = useState(false);
  const [competencies, setCompetencies] = useState<CompetencyType[] | null>([]);
  const [selected, setSelected] = useState(empty[0]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompetencies = async () => {
      setLoading(true);
      const res = await fetch(`/api/competency`);
      const competencies: CompetencyType[] = await res.json();
      if (res.status === 200) {
        setCompetencies(competencies);
        setLoading(false);
      } else {
        setCompetencies([]);
        setLoading(false);
      }
    };
    fetchCompetencies();
  }, []);

  // console.log('selected', selected);
  // console.log('competencies', competencies);

  function handleSelected(value: any) {
    setSelected(value);
  }

  const assignCompetency = async (competencyId: string, profileId: string) => {
    console.log('competencyId', competencyId);
    console.log('profileId', profileId);
    if (competencyId === 'none') {
      setError('Please choose one of the competencies to assign');
    }
    const newConnection = {
      competencyId: competencyId,
      profileId: profileId,
    };
    try {
      const response = await fetch('/api/connection', {
        method: 'POST',
        body: JSON.stringify(newConnection),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const connectionResponse = await response.json();
      console.log(connectionResponse);
      // setProfile(profileResponse);
      return newConnection;
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
              onClick={() => assignCompetency(selected.id, profileId)}
            />
          </div>
          <div className="text-sm text-red-600">{error ? error : null}</div>
        </>
      )}
    </div>
  );
};
export default ProfileCompetenciesLoading;
