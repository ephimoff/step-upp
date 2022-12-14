import Link from 'next/link';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';

export default function Navbar() {
  const [hidden, setHidden] = useState(true);

  const toggleMenu = () => {
    setHidden(!hidden);
  };
  return (
    <div className="bg-white p-5 text-black md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between md:flex md:items-center md:justify-between">
        <Link href="/" className="mr-4 text-2xl">
          logo
        </Link>
        <span
          onClick={toggleMenu}
          className="block cursor-pointer text-2xl md:hidden"
        >
          {hidden ? <HiMenu /> : <IoCloseSharp />}
        </span>
        <ul
          className={`-z-1 ${
            hidden ? '-top-[400px] opacity-0' : 'top-[70px] opacity-100'
          } absolute left-0 w-full bg-white py-4 pl-5  transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:py-0 md:opacity-100`}
        >
          <li className="my-6 mr-5 md:my-0">
            <Link
              href="/knowledge"
              className="text-xl text-cyan-700 duration-500 hover:text-cyan-500"
            >
              Knowledge base
            </Link>
          </li>
          <li className="my-6 mr-5 md:my-0">
            <Link
              href="/account"
              className="text-xl text-cyan-700 duration-500 hover:text-cyan-500"
            >
              Account
            </Link>
          </li>
          <button className="rounded bg-cyan-600 px-3 py-1 text-white duration-500 hover:bg-blue-600 md:hidden ">
            Sign Up 2
          </button>
        </ul>
      </div>
      <button className="hidden rounded bg-cyan-600 px-3 py-1 text-white duration-500 hover:bg-blue-600 md:block">
        Sign Up
      </button>
    </div>
  );
}
