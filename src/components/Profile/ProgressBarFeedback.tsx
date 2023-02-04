import { Popover } from '@headlessui/react';
import { useState } from 'react';
import PopoverPanel from '../PopoverPanel';

interface FeedbackScore {
  appraiser: any;
  date: Date;
  score: number;
}

interface Props {
  profileId: string;
  skillId: string;
  scores: FeedbackScore[];
}

const calculateAverage = (arr: any): null | number => {
  // console.log(arr);
  if (!arr) {
    return null;
  }
  let score = 0;
  arr.map((e: any) => {
    score += e.score;
  });
  return Math.round(score / arr.length);
};

const ProgressBarFeedback = ({ profileId, skillId, scores }: Props) => {
  const value = calculateAverage(scores);
  const [score, setScore] = useState<number | null>(value);

  return (
    <Popover className="">
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
      <Popover.Overlay className="absolute inset-0 rounded-xl bg-black opacity-30" />
      <Popover.Panel className="absolute left-1/2 top-1/2 z-10 w-screen max-w-sm -translate-x-1/2 -translate-y-1/2">
        {({ close }) => (
          <PopoverPanel
            type="feedback"
            value={value}
            profileId={profileId}
            skillId={skillId}
            setScore={setScore}
            close={close}
            scores={scores}
          />
        )}
      </Popover.Panel>
    </Popover>
  );
};
export default ProgressBarFeedback;
