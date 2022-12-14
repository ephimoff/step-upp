import React from 'react';
import ProgressBar from '../Profile/ProgressBar';
import Card from '../Card';
import { CompetencyType } from '@/types/types';
import CustomButton from '../CustomButton';

interface Props {
  competencies: CompetencyType[];
  profileId: string;
}

const CompetencyCard = ({ competencies, profileId }: any) => {
  // console.log('competencies====');
  // console.dir(competencies, { depth: null });
  return (
    <>
      {competencies.map((element: any, index: number) => {
        console.log(element.competency);
        return (
          <Card grid={true} key={index}>
            <div className="col-span-5">
              <h2 className="text-xl text-purple-400">
                {element.competency.name}
              </h2>
            </div>
            <div className="col-span-2 text-sm text-slate-400">
              <h2>Skill</h2>
            </div>
            <div className=" text-sm text-slate-400">
              <h2>Self-score</h2>
            </div>
            <div className=" text-sm text-slate-400">
              <h2>360-score</h2>
            </div>
            <div className=" text-sm text-slate-400">
              <h2>Actions</h2>
            </div>
            {element.competency.skills.map((skill: any, skillIndex: number) => {
              return (
                <React.Fragment key={skillIndex}>
                  <div className="col-span-2 font-normal">{skill.name}</div>
                  <ProgressBar
                    value={skill.scores[0]?.score}
                    profileId={profileId}
                    skillId={skill.id}
                    type="self"
                  />
                  <ProgressBar
                    value={skill.scores[0]?.score360}
                    type="360"
                    profileId={profileId}
                    skillId={skill.id}
                  />
                  <div>
                    <CustomButton text={'+ 2'} size={'small'} />
                  </div>
                </React.Fragment>
              );
            })}
          </Card>
        );
      })}
    </>
  );
};
export default CompetencyCard;
