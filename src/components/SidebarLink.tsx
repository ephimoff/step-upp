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
      className={`mt-2 flex items-center gap-x-4 rounded-md p-2 text-sm text-gray-300 hover:bg-blue-700 ${
        router.pathname == path ? 'bg-blue-800' : ''
      }`}
    >
      <span>{icon}</span>
      <span className={`${!open && 'hidden'} origin-left duration-300`}>
        {name}
      </span>
    </Link>
  );
};
export default SidebarLink;
