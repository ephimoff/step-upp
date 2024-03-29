import Link from 'next/link';
import { useRouter } from 'next/router';

type SidebarLinkProps = {
  path: string;
  name: string;
  open: boolean;
  icon: React.ReactNode;
};

const SidebarLink = ({ path, name, open, icon }: SidebarLinkProps) => {
  const router = useRouter();
  return (
    <Link
      href={path}
      className={` ml-0 mt-2 flex items-center gap-x-4 rounded-md py-3 pl-3  hover:bg-purple-100 dark:hover:bg-purple-500 ${
        router.pathname == path
          ? 'font-semibold text-purple-600'
          : 'text-gray-600 dark:text-gray-300'
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className={`${!open && 'hidden'} origin-left duration-300`}>
        {name}
      </span>
    </Link>
  );
};
export default SidebarLink;
