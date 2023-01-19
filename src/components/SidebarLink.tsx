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
      className={` ml-0 mt-2 flex items-center gap-x-4 rounded-md py-3 pl-3 text-black hover:bg-purple-300 ${
        router.pathname == path ? 'bg-purple-400' : ''
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
