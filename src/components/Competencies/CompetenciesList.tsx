import { SkillType, CompetencyType } from '@/types/types';
import Card from '../Card';

type Props = {
  competencies: CompetencyType[];
};

const CompetenciesList = ({ competencies }: Props) => {
  return (
    <Card>
      {competencies && competencies.length > 0 ? (
        <div>
          <h2 className="text-xl text-purple-600">Exisiting competencies</h2>
          <ul>
            {competencies.map((competency: CompetencyType, index: number) => {
              return (
                <li className="text-lg" key={index}>
                  {competency.name}
                  <ul>
                    {competency.skills?.map(
                      (skill: SkillType, skillIndex: number) => {
                        return (
                          <li
                            className="pl-4 text-sm text-gray-500"
                            key={skillIndex}
                          >
                            {skill.name}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>No competencies found</div>
      )}
    </Card>
  );
};
export default CompetenciesList;
