// import { useEffect, useState } from 'react';
import Card from '../Card';
import { SkillType, CompetencyType } from '@/types/types';
import { useFetch } from '@/hooks/useFetch';
import Spinner from '../Spinner';

const CompetenciesList = () => {
  const {
    response: competencies,
    error,
    loading,
  }: { response: CompetencyType[]; error: any; loading: boolean } = useFetch(
    `/api/competency`
  );

  if (loading) {
    return (
      <Card>
        <Spinner />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-red-500">Error: {error}</div>
      </Card>
    );
  }

  return (
    <Card>
      {competencies && competencies.length > 0 ? (
        <div>
          <h2 className="text-xl text-purple-400">Exisiting competencies</h2>
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
                            className="pl-4 text-sm text-gray-400"
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
