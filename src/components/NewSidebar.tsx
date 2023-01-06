import {
  BiHomeAlt,
  BiExit,
  BiUser,
  BiUserCircle,
  BiFoodMenu,
} from 'react-icons/bi';
import { siteTitle } from '@/data/data';
import Head from 'next/head';
type NewSidebarProps = {
  children: React.ReactNode;
  title?: string;
};

const NewSidebar = ({ children, title = siteTitle }: NewSidebarProps) => {
  return (
    <div className="">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="h-screen w-64 overflow-y-scroll rounded-md bg-gray-900">
        <div className="px-6 pt-8">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              x
            </a>
            <button className="flex items-center justify-center rounded bg-gray-800 p-0.5 text-xs">
              ←
            </button>
          </div>
        </div>
        <div className="px-6 pt-4">
          <input
            type="text"
            placeholder="search"
            className="font-ligh w-full rounded bg-gray-800 px-4 py-2.5 text-xs  text-gray-400 placeholder-gray-500"
          />
        </div>
        <div className="px-6 pt-4">
          <hr className="border-gray-700" />
        </div>
        <div className="px-6 pt-4">
          <ul className="flex flex-col space-y-2">
            <li className="relative text-gray-500 hover:text-white">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <BiHomeAlt />
              </div>
              <a
                href="/"
                className="inline-block w-full rounded py-2 pl-8 pr-4 text-xs hover:bg-gray-800"
              >
                Dashboard
              </a>
            </li>
            <li className="relative text-gray-500 hover:text-white">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <BiHomeAlt />
              </div>
              <a
                href="/"
                className="inline-block w-full rounded py-2 pl-8 pr-4 text-xs hover:bg-gray-800"
              >
                Dashboard
              </a>
            </li>
            <li className="relative text-gray-500 hover:text-white">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <BiHomeAlt />
              </div>
              <a
                href="/"
                className="inline-block w-full rounded py-2 pl-8 pr-4 text-xs hover:bg-gray-800"
              >
                Dashboard
              </a>
            </li>
          </ul>
        </div>
        <div className="px-6 pt-4">
          <hr className="border-gray-700" />
        </div>
        <div className="px-6 pt-4">
          <ul className="flex flex-col space-y-2">
            <li className="relative text-gray-500 hover:text-white">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <BiHomeAlt />
              </div>
              <a
                href="/"
                className="inline-block w-full rounded py-2 pl-8 pr-4 text-xs hover:bg-gray-800"
              >
                Dashboard
              </a>
            </li>
            <li className="relative text-gray-500 hover:text-white">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <BiHomeAlt />
              </div>
              <a
                href="/"
                className="inline-block w-full rounded py-2 pl-8 pr-4 text-xs hover:bg-gray-800"
              >
                Dashboard
              </a>
            </li>
            <li className="relative text-gray-500 hover:text-white">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <BiHomeAlt />
              </div>
              <a
                href="/"
                className="inline-block w-full rounded py-2 pl-8 pr-4 text-xs hover:bg-gray-800"
              >
                Dashboard
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-between bg-blue-900 py-4 pl-6 pr-4">
          <div className="flex items-center">
            <div className="relative h-8 w-8 rounded-full before:absolute before:right-0 before:bottom-0 before:h-2 before:w-2 before:rounded-full before:bg-green-500 before:ring-1 before:ring-white">
              <img
                src="https://thispersondoesnotexist.com/image"
                className="rounded-full"
                alt=""
              />
            </div>
            <div className="flex flex-col pl-3">
              <div className="text-sm text-gray-50">Jane Doeson</div>
              <span className="text-sm font-light tracking-tight text-gray-400">
                emailemail@email.com
              </span>
            </div>
          </div>
          <button className="h-4 w-4 rounded bg-gray-800 text-xs text-gray-400">
            ^
          </button>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
export default NewSidebar;
