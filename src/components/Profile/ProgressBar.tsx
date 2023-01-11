import { Popover } from '@headlessui/react';
// import CustomButton from '../CustomButton';
import PopoverPanel from '../PopoverPanel';

type ProgressBarProps = {
  value: number | null;
  type: 'self' | '360';
  profileId: string;
  skillId: string;
};

const ProgressBar = ({ value, type, profileId, skillId }: ProgressBarProps) => {
  return (
    <Popover className="relative">
      <Popover.Button className="w-full rounded-xl px-4 hover:bg-blue-700 focus:outline-none">
        <div className="flex h-full items-center gap-x-2">
          <span>
            {!value
              ? '❔'
              : value <= 2
              ? '🍄'
              : value <= 4
              ? '🥕'
              : value <= 6
              ? '😎'
              : value <= 8
              ? '☘️'
              : '💎'}
          </span>
          <div className="h-2 w-full rounded-xl bg-gray-300">
            <div
              style={{ width: `${value! * 10}%` }}
              className={`h-full rounded-xl ${
                value! <= 2
                  ? 'bg-red-600'
                  : value! <= 4
                  ? 'bg-orange-400'
                  : value! <= 6
                  ? 'bg-yellow-400'
                  : value! <= 8
                  ? 'bg-green-400'
                  : 'bg-cyan-400'
              }`}
            ></div>
          </div>
          <span>{!value ? '❔' : value}</span>
        </div>
      </Popover.Button>
      <Popover.Panel className="absolute -top-24 z-10">
        <PopoverPanel
          type={type}
          value={value}
          profileId={profileId}
          skillId={skillId}
        />
        {/* <div className="grid w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-sm text-white shadow-xl">
          <strong
            className={`${
              value! <= 2
                ? 'text-red-400'
                : value! <= 4
                ? 'text-orange-400'
                : value! <= 6
                ? 'text-yellow-400'
                : value! <= 8
                ? 'text-green-400'
                : 'text-cyan-400'
            } text-xs`}
          >
            {!value ? '???' : `${value} out of 10:`}
          </strong>
          <span>
            {!value
              ? 'No assessment yet'
              : value <= 2
              ? 'Very high-level knowledge. No practical experience'
              : value <= 4
              ? 'Maybe used the skill once or twice'
              : value <= 6
              ? 'Can finish all the assigned tasks'
              : value <= 8
              ? 'Can use this skill in the work without any guidence from the side'
              : 'An absolute MVP. You can teach others and write books about it'}
          </span>
          <div className="mx-auto flex justify-center">
            <input
              type="number"
              className="mr-2 w-1/2 rounded-md border bg-slate-700 py-1 text-center"
            />
            <CustomButton
              text={type === 'self' ? 'Update' : 'Request assessment'}
              size={'small'}
              role={'secondary'}
            />
          </div>
        </div> */}
      </Popover.Panel>
      {/* <Popover.Overlay className="fixed inset-0 bg-black opacity-30" /> */}
    </Popover>
    // </div>
  );
};
export default ProgressBar;
