import { User } from 'lucide-react';
import Card from './Card';
import Toggle from './Toggle';
import Image from 'next/image';

interface Profile {
  name: string;
  id: string;
  slug: string;
  team: string;
  title: string;
  email: string;
  userpic: string;
  user: {
    id: string;
    membership: {
      role: 'OWNER' | 'MEMBER';
      workspaceId: string;
    }[];
  };
}

type Props = {
  profiles: Profile[];
  updateAccess: any;
};

const OwnwershipSearchResults = ({ profiles, updateAccess }: Props) => {
  if (profiles.length > 0) {
    return (
      <Card>
        {profiles.map((profile, index) => {
          return (
            <div
              key={index}
              className="group relative my-4 grid grid-cols-7 items-center rounded-md py-4 pl-4 pr-8 "
            >
              {profile.userpic ? (
                <Image
                  alt="Userpic"
                  src={profile.userpic}
                  width={32}
                  height={32}
                  className="mr-8 rounded-full"
                />
              ) : (
                <User
                  className="mr-8 h-8 w-8 rounded-full bg-gradient-to-br from-purple-300 to-green-300 p-1 text-black"
                  strokeWidth={3}
                />
              )}
              <h2 className="col-span-2 mr-8 text-lg font-semibold">
                {profile.name}
              </h2>
              <div className="col-span-3">
                <div>{profile.title}</div>
                <div className="text-slate-400 dark:text-slate-500">
                  {profile.team}
                </div>
              </div>
              <div className="mx-auto flex">
                <Toggle
                  profileId={profile.id}
                  userId={profile.user.id}
                  isEnabled={profile.user.membership[0].role === 'OWNER'}
                  toggleAction={updateAccess}
                />
              </div>
            </div>
          );
        })}
      </Card>
    );
  }
  return (
    <div className="flex items-center">
      <span>Nothing was found</span>
    </div>
  );
};
export default OwnwershipSearchResults;
