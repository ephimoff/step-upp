import React from 'react';
import ProgressBar from '../Profile/ProgressBar';
import Card from '../Card';
import { CompetencyType } from '@/types/types';
import CustomButton from '../CustomButton';
import ProgressBarFeedback from '../Profile/ProgressBarFeedback';

interface CompetencyCardProps {
  competency: CompetencyType;
  profileId: string;
}

const CompetencyCard = ({ competency, profileId }: CompetencyCardProps) => {
  // console.dir(competency, { depth: null });
  return (
    <>
      <Card grid={true}>
        <div className="col-span-5">
          <h2 className="text-xl text-purple-400">{competency.name}</h2>
        </div>
        <div className="col-span-2 text-sm text-slate-400">
          <h2>Skill</h2>
        </div>
        <div className=" text-sm text-slate-400">
          <h2>Self-score</h2>
        </div>
        <div className=" text-sm text-slate-400">
          <h2>Feedback-score</h2>
        </div>
        <div className=" text-sm text-slate-400">
          <h2>Actions</h2>
        </div>
        {competency.skills?.map((skill: any, skillIndex: number) => {
          // console.log(skill);
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
                value={null}
                profileId={profileId}
                skillId={skill.id}
                type="feedback"
                scores={skill.scores[0]?.feedbackScores}
              />
              {/* <ProgressBarFeedback
                profileId={profileId}
                skillId={skill.id}
                scores={skill.scores[0]?.feedbackScores}
              /> */}
              <div>
                <CustomButton text={'+ 2'} size={'small'} />
              </div>
            </React.Fragment>
          );
        })}
      </Card>
    </>
  );
};
export default CompetencyCard;
