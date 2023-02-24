import React from 'react';
import ProgressBar from '../Profile/ProgressBar';
import Card from '../Card';
import { CompetencyType } from '@/types/types';
import CustomButton from '../CustomButton';
// import ProgressBarFeedback from '../Profile/ProgressBarFeedback';

interface Props {
  competency: CompetencyType;
  profileId: string;
  isSameProfile: boolean;
  requestorName?: string;
  slug: string;
}

const CompetencyCard = ({
  competency,
  profileId,
  isSameProfile,
  requestorName,
  slug,
}: Props) => {
  return (
    <>
      <Card grid={true}>
        <div className="col-span-7">
          <h2 className="text-purple-400 sm:text-lg md:text-xl">
            {competency.name}
          </h2>
        </div>
        <div className="col-span-1 text-xs text-slate-400 lg:col-span-3">
          <h2>Skill</h2>
        </div>
        <div className="col-span-3 text-xs text-slate-400 lg:col-span-2">
          <h2>Self-score</h2>
        </div>
        <div className="col-span-3 text-xs text-slate-400 lg:col-span-2">
          <h2>Feedback-score</h2>
        </div>
        {competency.skills?.map((skill: any, skillIndex: number) => {
          return (
            <React.Fragment key={skillIndex}>
              <div className="text-2xs col-span-1 font-normal lg:col-span-3 lg:text-base">
                {skill.name}
              </div>
              <div className="col-span-3 lg:col-span-2">
                <ProgressBar
                  value={skill.scores[0]?.score}
                  profileId={profileId}
                  skillId={skill.id}
                  type="self"
                  isSameProfile={isSameProfile}
                />
              </div>
              <div className="col-span-3 lg:col-span-2">
                <ProgressBar
                  value={null}
                  profileId={profileId}
                  skillId={skill.id}
                  type="feedback"
                  scores={skill.scores[0]?.feedbackScores}
                  isSameProfile={isSameProfile}
                  requestorName={requestorName}
                  slug={slug}
                />
              </div>
            </React.Fragment>
          );
        })}
      </Card>
    </>
  );
};
export default CompetencyCard;
