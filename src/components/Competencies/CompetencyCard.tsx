import React from 'react';
import ProgressBar from '../Profile/ProgressBar';
import Card from '../Card';
import { CompetencyType } from '@/types/types';
import CustomButton from '../CustomButton';
// import ProgressBarFeedback from '../Profile/ProgressBarFeedback';

interface Props {
  competency: CompetencyType;
  profileId: string;
}

const CompetencyCard = ({ competency, profileId }: Props) => {
  // console.dir(competency, { depth: null });
  return (
    <>
      <Card grid={true}>
        <div className="col-span-5">
          <h2 className="text-purple-400 sm:text-lg md:text-xl">
            {competency.name}
          </h2>
        </div>
        <div className="col-span-1 text-xs text-slate-400 sm:col-span-3">
          <h2>Skill</h2>
        </div>
        <div className="col-span-2 text-xs text-slate-400 sm:col-span-1">
          <h2>Self-score</h2>
        </div>
        <div className="col-span-2 text-xs text-slate-400 sm:col-span-1">
          <h2>Feedback-score</h2>
        </div>
        {competency.skills?.map((skill: any, skillIndex: number) => {
          return (
            <React.Fragment key={skillIndex}>
              <div className="col-span-1 text-xs font-normal sm:col-span-3 sm:text-base">
                {skill.name}
              </div>
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
            </React.Fragment>
          );
        })}
      </Card>
    </>
  );
};
export default CompetencyCard;
