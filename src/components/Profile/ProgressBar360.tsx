import { Popover } from '@headlessui/react';
import { useState } from 'react';
import PopoverPanel from '../PopoverPanel';

interface Score360 {
  appraiser: any;
  date: Date;
  score: number;
}

interface Props {
  profileId: string;
  skillId: string;
  scores: Score360[];
}

const calculateAverage = (arr: any): null | number => {
  if (arr.length < 1) {
    return null;
  }
  let score = 0;
  arr.map((e: any) => {
    score += e.score;
  });
  return Math.round(score / arr.length);
};

const ProgressBar360 = ({ profileId, skillId, scores }: Props) => {
  const value = calculateAverage(scores);
  const [score, setScore] = useState<number | null>(value);

  console.log(profileId);
  console.log(skillId);
  console.log(scores);
  console.log(value);
  return (
    <Popover className="relative">
      <Popover.Button className="w-full rounded-xl px-4 hover:bg-blue-700 focus:outline-none">
        <div className="flex h-full items-center gap-x-2">
          <span>
            {!score
              ? '❓'
              : score <= 2
              ? '🍄'
              : score <= 4
              ? '🥕'
              : score <= 6
              ? '😎'
              : score <= 8
              ? '☘️'
              : '💎'}
          </span>
          <div className="h-2 w-full rounded-xl bg-gray-300">
            <div
              style={{ width: `${score! * 10}%` }}
              className={`h-full rounded-xl ${
                score! <= 2
                  ? 'bg-red-600'
                  : score! <= 4
                  ? 'bg-orange-400'
                  : score! <= 6
                  ? 'bg-yellow-400'
                  : score! <= 8
                  ? 'bg-green-400'
                  : 'bg-cyan-400'
              }`}
            ></div>
          </div>
          <span>{!score ? '❓' : score}</span>
        </div>
      </Popover.Button>
      <Popover.Panel className="absolute -top-24 z-10">
        {({ close }) => (
          <PopoverPanel
            type={'360'}
            value={value}
            profileId={profileId}
            skillId={skillId}
            setScore={setScore}
            close={close}
          />
        )}
      </Popover.Panel>
    </Popover>
  );
};
export default ProgressBar360;
