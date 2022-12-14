import { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { CiCoffeeCup } from 'react-icons/ci';
import { RiAccountCircleFill } from 'react-icons/ri';
import { FaBook, FaRegUserCircle } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import SidebarLink from './SidebarLink';
import SignInOutButton from './SingInOutButton';

type SidebarProps = {
  children: React.ReactNode;
};

export const sidebarLinks = [
  {
    name: 'Account',
    path: '/account',
    icon: <RiAccountCircleFill size={24} />,
  },
  { name: 'Docs', path: '/', icon: <FaBook size={24} /> },
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
          open ? 'w-72' : 'w-20'
        } relative h-screen bg-blue-900 p-5 pt-8 duration-300`}
      >
        <div
          onClick={toggleSidebar}
          className="absolute -right-3 top-9 w-7 cursor-pointer rounded-full border-2 border-blue-900 bg-blue-800 text-2xl shadow"
        >
          {open ? <HiChevronLeft /> : <HiChevronRight />}
        </div>
        <div>
          <Link className="flex items-center gap-x-4" href="/">
            <span
              className={`text-3xl duration-500 ${open && 'rotate-[360deg]'}`}
            >
              <CiCoffeeCup className="duration-500" size={32} />
            </span>
            <h1
              className={`${
                !open && 'scale-0'
              } origin-left text-2xl font-medium duration-300`}
            >
              logo
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
        <div className="absolute bottom-0 flex pb-2">
          <span className="p-2 text-2xl">
            <FaRegUserCircle />
          </span>
          <div className={`${!open && 'hidden'} origin-left p-2 duration-200`}>
            {status === 'authenticated' ? (
              <div className="">
                <span className="mr-4 align-top">{session.user!.name}</span>
                <button onClick={() => signOut()}>
                  <IoExitOutline size={24} />
                </button>
                {/* <SignInOutButton type="signout" /> */}
              </div>
            ) : (
              <SignInOutButton type="signin" />
            )}
          </div>
        </div>
      </div>
      <div className="tex-2xl h-screen flex-1 p-7 font-semibold">
        {children}
      </div>
    </div>
  );
}
