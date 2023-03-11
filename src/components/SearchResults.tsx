import Card from './Card';
import Link from 'next/link';
import Image from 'next/image';
import { User, ChevronsRight } from 'lucide-react';

interface Profile {
  name: string;
  id: string;
  slug: string;
  team: string;
  title: string;
  email: string;
  userpic: string;
}

type Props = {
  profiles: Profile[];
};

const SearchResults = ({ profiles }: Props) => {
  // console.log('profiles', profiles);
  if (profiles.length > 0) {
    return (
      <Card>
        {profiles.map((profile, index) => {
          return (
            <Link
              href={`/profile/${profile.slug}`}
              key={index}
              className="group relative my-4 flex items-center rounded-md py-4 pl-4 pr-8 hover:bg-purple-500 hover:text-white"
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
              <h2 className="mr-8 text-2xl font-semibold">{profile.name}</h2>
              <div>
                {/* <div>{profile.email}</div> */}
                <div>{profile.title}</div>
                <div className="text-slate-400 dark:text-slate-500">
                  {profile.team}
                </div>
              </div>
              <ChevronsRight className="absolute right-2 text-slate-300 dark:text-slate-600" />
            </Link>
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
export default SearchResults;
