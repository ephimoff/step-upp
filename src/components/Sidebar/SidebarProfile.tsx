import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { BiExit } from 'react-icons/bi';
import NoAvatar from '../NoAvatar';
import ThemeToggle from './ThemeToggle';

type SidebarProfileProps = {
  mounted: boolean;
  open: boolean;
  name: string;
};

const SidebarProfile = ({ mounted, open, name }: SidebarProfileProps) => {
  const { data: session } = useSession();

  return (
    <div className={`rounded-md  py-2 ${open && 'p-4'}`}>
      <div className="flex items-center justify-center ">
        <Link href="/myprofile" className="">
          {session!.user!.image ? (
            <img
              src={session!.user!.image as string}
              alt=""
              className={`${
                !open ? 'h-10' && 'w-10' : 'h-12' && 'w-12'
              } mx-auto mb-2 rounded-full shadow-lg`}
            />
          ) : (
            <NoAvatar
              name={name ? name : (session!.user!.name as string)}
              size={!open ? 10 : 12}
            />
          )}
          <span
            className={`${
              !open && 'hidden'
            } origin-left whitespace-nowrap duration-500 dark:text-white`}
          >
            {name ? name : session!.user!.name}
          </span>
        </Link>
      </div>
      <div className={`${open && 'flex'} mt-2 items-baseline justify-center`}>
        <div className={`${open && 'mr-4'} flex justify-center rounded-lg`}>
          {mounted && <ThemeToggle />}
        </div>
        <div className="mt-3 flex justify-center rounded-lg">
          <button
            onClick={() => signOut()}
            className="flex items-center justify-center rounded-lg bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-purple-500 hover:text-white dark:bg-gray-900 dark:hover:bg-purple-500"
          >
            <BiExit className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default SidebarProfile;
