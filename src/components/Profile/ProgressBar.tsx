import { Popover } from '@headlessui/react';
import { useEffect, useState } from 'react';
import PopoverPanel from '../PopoverPanel';

interface FeedbackScore {
  appraiser: any;
  date: Date;
  score: number;
}

type Props = {
  value: number | null;
  type: 'self' | 'feedback';
  profileId: string;
  skillId: string;
  scores?: FeedbackScore[];
};

const ProgressBar = ({ value, type, profileId, skillId, scores }: Props) => {
  const [score, setScore] = useState<number | null>(value);

  useEffect(() => {
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

    if (type === 'feedback') {
      setScore(calculateAverage(scores));
    }
  }, []);

  return (
    <div className="col-span-2 sm:col-span-1">
      <Popover className="">
        <Popover.Button className="w-full rounded-xl px-4 hover:bg-blue-700 focus:outline-none">
          <div className="flex h-full items-center gap-x-2 ">
            <span className="text-xs sm:text-base">
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
            <span className="text-xs sm:text-base">
              {!score ? '❓' : score}
            </span>
          </div>
        </Popover.Button>
        <Popover.Overlay className="absolute inset-0 rounded-xl bg-black opacity-30" />
        <Popover.Panel className="absolute left-1/2 top-1/2 z-10 w-3/4 max-w-sm -translate-x-1/2 -translate-y-1/2 sm:w-screen">
          {({ close }) => (
            <PopoverPanel
              type={type}
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
    </div>
  );
};
export default ProgressBar;
