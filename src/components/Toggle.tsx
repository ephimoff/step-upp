import { useState } from 'react';
import { Switch } from '@headlessui/react';

type Props = {
  profileId: string;
  userId: string;
  isEnabled: boolean;
  toggleAction: any;
};

const Toggle = ({ profileId, userId, isEnabled, toggleAction }: Props) => {
  const [enabled, setEnabled] = useState(isEnabled);

  const sendUpdate = async () => {
    setEnabled(!enabled);
    // console.log('enabled', enabled);
    toggleAction(profileId, userId, enabled ? 'MEMBER' : 'OWNER');
  };

  return (
    <div className="mx-4">
      <Switch
        checked={enabled}
        onChange={sendUpdate}
        className={`${enabled ? 'bg-purple-600' : 'bg-gray-400'}
          relative inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

export default Toggle;
