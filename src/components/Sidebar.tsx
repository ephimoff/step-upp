import { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import {
  BiHomeAlt,
  BiExit,
  BiUser,
  BiUserCircle,
  BiFoodMenu,
} from 'react-icons/bi';
import { CiCoffeeCup } from 'react-icons/ci';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import SidebarLink from './SidebarLink';
import SignInOutButton from './SingInOutButton';

type SidebarProps = {
  children: React.ReactNode;
};

export const sidebarLinks = [
  {
    name: 'Home',
    path: '/',
    icon: <BiHomeAlt />,
  },
  {
    name: 'Account',
    path: '/account',
    icon: <BiUser />,
  },
  { name: 'Docs', path: '/docs', icon: <BiFoodMenu /> },
];

export default function Sidebar({ children }: SidebarProps) {
  const { data: session, status } = useSession();

  const [open, setOpen] = useState(true);
  const toggleSidebar = () => {
    setOpen(!open);
  };
  return (
    <div className="flex">
      <div
        className={`${
          open ? 'w-72' : 'w-24'
        } relative  bg-white p-4 pt-8 text-black duration-300`}
      >
        <div
          onClick={toggleSidebar}
          className="absolute -right-4 top-9 w-7 cursor-pointer rounded-full border-2 bg-sky-200 text-2xl text-sky-500 shadow"
        >
          {open ? <HiChevronLeft /> : <HiChevronRight />}
        </div>
        <div>
          <Link className="flex items-center gap-x-4" href="/">
            <span
              className={`rounded-xl border-2 border-sky-600 bg-sky-500 p-2 text-3xl text-white duration-500 ${
                open && 'rotate-[360deg]'
              }`}
            >
              <CiCoffeeCup className="duration-500" size={32} />
            </span>
            <h1
              className={`${
                !open && 'scale-0'
              } origin-left whitespace-nowrap text-3xl font-medium duration-300`}
            >
              Step<strong className="font-extrabold text-sky-500">Upp</strong>
            </h1>
          </Link>
        </div>
        <ul className="pt-6">
          {sidebarLinks.map((link, index) => {
            return (
              <li key={index} className="mb-3">
                <SidebarLink
                  path={link.path}
                  name={link.name}
                  open={open}
                  icon={link.icon}
                />
              </li>
            );
          })}
        </ul>
        <div className="absolute bottom-4 ml-0 mr-4 flex items-center gap-x-4 py-3 pl-3">
          {status === 'authenticated' ? (
            <>
              <span className="text-2xl">
                <BiUserCircle />
              </span>
              <span
                className={`${
                  !open && 'hidden'
                } origin-left whitespace-nowrap duration-200`}
              >
                {session.user!.name}
              </span>
              <button
                onClick={() => signOut()}
                className={`${
                  !open && 'hidden'
                } origin-left text-2xl duration-200`}
              >
                <BiExit />
              </button>
            </>
          ) : (
            <SignInOutButton type="signin" />
          )}
        </div>
      </div>
      <div className="tex-2xl h-screen flex-1 p-7 font-semibold">
        {children}
      </div>
    </div>
  );
}
