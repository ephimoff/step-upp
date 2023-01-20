import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { BiHomeAlt, BiUser, BiFoodMenu } from 'react-icons/bi';
import Link from 'next/link';
// import { useSession } from 'next-auth/react';
import SidebarLink from '../SidebarLink';
import { siteTitle } from '@/data/data';
import Head from 'next/head';
import { useUser } from '@/contexts/user.context';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import SidebarProfile from './SidebarProfile';

type SidebarProps = {
  children: React.ReactNode;
  name: string;
  title?: string;
};

export const sidebarLinks = [
  {
    name: 'Home',
    path: '/',
    icon: <BiHomeAlt />,
  },
  {
    name: 'Profiles',
    path: '/profile',
    icon: <BiUser />,
  },
  { name: 'Competencies', path: '/competency', icon: <BiFoodMenu /> },
];

export default function Sidebar({
  children,
  name,
  title = siteTitle,
}: SidebarProps) {
  // required for theme switching
  const [mounted, setMounted] = useState(false);
  // const { data: session, status } = useSession();
  const { open, setOpen } = useUser();

  useEffect(() => setMounted(true), []);

  const toggleSidebar = () => {
    setOpen(!open);
  };
  // const sidebarGradient = `bg-gradient-to-br from-[#c9def4] via-[#f5ccd4] to-[#b8a4c9]`;
  // const sidebarGradient = `bg-gradient-to-tl from-[#595cff] to-[#c6f8ff]`;
  // const logoGradient = `bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent`;
  return (
    <div className="flex bg-gray-200 dark:bg-gray-900">
      <Head>
        <title>{title}</title>
      </Head>
      <div
        className={`${
          open ? 'w-72' : 'w-28'
        } sticky top-0 h-screen text-black duration-300`}
      >
        <div className="relative m-4 h-5/6 rounded-xl bg-white pt-8 dark:bg-slate-800">
          <div className="px-4">
            <div
              onClick={toggleSidebar}
              className="absolute -right-3 top-3 h-6 w-6 cursor-pointer rounded-full bg-gray-300 text-2xl text-gray-400 shadow-lg dark:bg-gray-700"
            >
              {open ? <HiChevronLeft /> : <HiChevronRight />}
            </div>
            <div>
              <Link href="/">
                <Logo open={open} />
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
          </div>
          <div className="absolute bottom-4 w-full px-4">
            <SidebarProfile mounted={mounted} open={open} name={name} />
          </div>
        </div>
      </div>
      <div className="flex-1 p-7">
        <div className="mx-auto sm:w-full md:w-3/5">{children}</div>
      </div>
    </div>
  );
}
