// import logo0 from '@/assets/logo0.png';
import logo1 from '@/assets/logo1.png';
import logo2 from '@/assets/logo.png';
import logo1Dark from '@/assets/logo1_dark.png';
import Image from 'next/image';

type Props = {
  open: boolean;
};

const Logo = ({ open }: Props) => {
  return (
    <div className="flex items-center gap-x-4">
      <Image
        src={logo1}
        className={`w-12 duration-500 dark:hidden ${open && 'rotate-[360deg]'}`}
        alt=""
      />
      <Image
        src={logo1Dark}
        className={`hidden w-12 duration-500 dark:block ${
          open && 'rotate-[360deg]'
        }`}
        alt=""
      />
      <Image
        src={logo2}
        className={`w-36 shrink-0 origin-left duration-300 ${
          !open && 'scale-0'
        }`}
        alt=""
      />
    </div>
  );
};
export default Logo;
