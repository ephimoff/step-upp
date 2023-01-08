import { CompetencyType } from '@/types/competencyTypes';
import { useEffect, useState } from 'react';
import CustomButton from '../CustomButton';
import Dropdown from '../Dropdown';
import Spinner from '../Spinner';

const options = [{ id: 'none', name: 'Choose competency' }];

type ProfileCompetenciesLoadingProps = {
  props: string;
};

const ProfileCompetenciesLoading = ({
  props,
}: ProfileCompetenciesLoadingProps) => {
  const [loading, setLoading] = useState(false);
  const [competencies, setCompetencies] = useState<CompetencyType[] | null>([]);
  const [selected, setSelected] = useState(options[0]);

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

  console.log('selected', selected);
  console.log('competencies', competencies);

  function handleSelected(value: any) {
    setSelected(value);
  }

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
            <CustomButton text={'Assign competency'} />
          </div>
        </>
      )}

      {/* <div>
        <Spinner />
      </div> */}
    </div>
  );
};
export default ProfileCompetenciesLoading;
