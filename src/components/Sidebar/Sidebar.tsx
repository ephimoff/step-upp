import {
  Home,
  User,
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
  Paintbrush,
} from 'lucide-react';
import Link from 'next/link';
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
    icon: <Home />,
  },
  {
    name: 'Profiles',
    path: '/profile',
    icon: <User />,
  },
  { name: 'Competencies', path: '/competency', icon: <BookOpenCheck /> },
  { name: 'Design', path: '/design', icon: <Paintbrush /> },
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

  return (
    <div className="flex bg-gray-200 dark:bg-gray-900">
      <Head>
        <title>{title}</title>
      </Head>
      {/* container of the sidebar */}
      <div
        className={`${
          open ? 'w-72' : 'w-28'
        } sticky top-0 h-screen text-black duration-300`}
      >
        {/* visible part of the sidebar */}
        <div className="relative m-4 h-5/6 rounded-xl bg-white pt-8 drop-shadow-2xl transition duration-300 ease-in-out dark:bg-slate-800 dark:bg-gradient-to-tl dark:from-slate-800 dark:to-[#334562]">
          <div className="px-4">
            <div
              onClick={toggleSidebar}
              className="absolute -right-3 top-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-xl text-gray-400 shadow-lg drop-shadow-xl dark:bg-gray-900"
            >
              <ChevronLeft
                size={20}
                strokeWidth={3}
                className={`transition delay-300 duration-700 ${
                  !open && 'rotate-180'
                }`}
              />
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
      <div className="flex-1">
        <div className="mx-auto mt-4 sm:w-full md:w-3/5">{children}</div>
      </div>
    </div>
  );
}
