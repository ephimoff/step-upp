import React from 'react';
import ProgressBar from './ProgressBar';

interface Skill {
  name: string;
  score: number | null;
  score360: number | null;
  actions: number | null;
}
interface Competency {
  name: string;
  skills: Skill[];
}
interface Props {
  competencies: Competency[];
}

const CompetencyCard = ({ competencies }: Props) => {
  return (
    <>
      {competencies.map((competency: any, index: number) => {
        return (
          <section
            className="my-10 grid grid-cols-5 gap-4 rounded-xl bg-slate-900 py-4 px-6 drop-shadow-2xl"
            key={index}
          >
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
              <h2>360-score</h2>
            </div>
            <div className=" text-sm text-slate-400">
              <h2>Actions</h2>
            </div>
            {competency.skills.map((skill: any, skillIndex: number) => {
              return (
                <React.Fragment key={skillIndex}>
                  <div className="col-span-2 font-normal">{skill.name}</div>
                  <ProgressBar value={skill.score} type="self" />
                  <ProgressBar value={skill.score360} type="360" />
                  <div>
                    <button className="w-1/4 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 shadow-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-l">
                      +{skill.actions}
                    </button>
                  </div>
                </React.Fragment>
              );
            })}
          </section>
        );
      })}
    </>
  );
};
export default CompetencyCard;
