// import { HiOutlineBolt } from 'react-icons/hi2';
import { Carrot } from 'lucide-react';
import logo0 from '@/assets/logo0.png';
import logo1 from '@/assets/logo1.png';
import logo2 from '@/assets/logo.png';
import logo1Dark from '@/assets/logo1_dark.png';
import Image from 'next/image';

type LogoProps = {
  open: boolean;
};

//

const Logo = ({ open }: LogoProps) => {
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
      {/* <span
        className={`rounded-xl bg-gradient-to-r from-[#12c2e9] via-purple-700 to-[#f64f59] p-2 text-3xl text-white duration-500 ${
          open && 'rotate-[360deg]'
        }`}
      >
        <Carrot className="duration-500" size={32} />
      </span> */}
      <Image
        src={logo2}
        className={`w-36 shrink-0 origin-left duration-500 ${
          !open && 'scale-0'
        }`}
        alt=""
      />
      {/* <h1
        className={`${
          !open && 'scale-0'
        } origin-left whitespace-nowrap bg-gradient-to-r from-[#12c2e9] via-purple-700 to-[#f64f59] bg-clip-text text-3xl font-medium text-transparent duration-300`}
      >
        Step
        <strong className={`font-extrabold`}>Upp</strong>
      </h1> */}
    </div>
  );
};
export default Logo;
