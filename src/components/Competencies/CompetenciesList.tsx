import { Competency } from '@prisma/client';
import { useEffect, useState } from 'react';
import Card from '../Card';

const CompetenciesList = () => {
  const [competencies, setCompetencies] = useState<Competency[] | null>([]);

  useEffect(() => {
    const fetchCompetencies = async () => {
      const res = await fetch(`/api/competency`);
      const competencies: Competency[] = await res.json();
      console.log(competencies);
      if (res.status === 200) {
        setCompetencies(competencies);
      } else {
        setCompetencies([]);
      }
    };
    fetchCompetencies();
  }, []);
  return (
    <Card>
      <div>
        <div>
          {competencies && competencies.length > 0 ? (
            <div>
              <h2 className="text-xl text-purple-400">
                Exisiting competencies
              </h2>
              <ul>
                {competencies.map((competency, index) => {
                  return (
                    <li className="text-lg" key={index}>
                      {competency.name}
                      <ul>
                        {competency.skills.map((skill, skillIndex) => {
                          return (
                            <li
                              className="pl-4 text-sm text-gray-400"
                              key={skillIndex}
                            >
                              {skill.name}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div>No competencies found</div>
          )}
        </div>
      </div>
    </Card>
  );
};
export default CompetenciesList;
