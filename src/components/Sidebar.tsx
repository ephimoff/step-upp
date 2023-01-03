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
import { siteTitle } from '@/data/data';
import Head from 'next/head';

type SidebarProps = {
  children: React.ReactNode;
  title?: string;
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

export default function Sidebar({ children, title = siteTitle }: SidebarProps) {
  const { data: session, status } = useSession();

  const [open, setOpen] = useState(true);
  const toggleSidebar = () => {
    setOpen(!open);
  };
  // const sidebarGradient = `bg-gradient-to-br from-[#c9def4] via-[#f5ccd4] to-[#b8a4c9]`;
  const sidebarGradient = `bg-gradient-to-tl from-[#595cff] to-[#c6f8ff]`;
  const logoGradient = `bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent`;
  return (
    <div className="flex">
      <Head>
        <title>{title}</title>
      </Head>
      <div
        className={`${
          open ? 'w-72' : 'w-24'
        } relative p-4 pt-8 text-black duration-300 ${sidebarGradient}`}
      >
        <div
          onClick={toggleSidebar}
          className="absolute -right-4 top-9 w-7 cursor-pointer rounded-full border-2 border-purple-500 bg-purple-300 text-2xl text-purple-500 shadow"
        >
          {open ? <HiChevronLeft /> : <HiChevronRight />}
        </div>
        <div>
          <Link className="flex items-center gap-x-4" href="/">
            <span
              className={`rounded-xl bg-purple-500 p-2 text-3xl text-white duration-500 ${
                open && 'rotate-[360deg]'
              }`}
            >
              <BiHomeAlt className="duration-500" size={32} />
            </span>
            <h1
              className={`${
                !open && 'scale-0'
              } origin-left whitespace-nowrap text-3xl font-medium duration-300`}
            >
              Step
              <strong className={`font-extrabold text-black ${logoGradient}`}>
                Upp
              </strong>
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
              <Link href="/profile" className="flex gap-x-4">
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
              </Link>
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
