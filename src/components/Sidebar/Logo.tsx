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
        width={48}
        height={48}
        className={`duration-500 dark:hidden ${open && 'rotate-[360deg]'}`}
        alt="Logo"
        priority
      />
      <Image
        src={logo1Dark}
        className={`hidden duration-500 dark:block ${
          open && 'rotate-[360deg]'
        }`}
        width={48}
        height={48}
        alt="Logo"
        priority
      />
      <Image
        src={logo2}
        className={`w-36 shrink-0 origin-left duration-300 ${
          !open && 'scale-0'
        }`}
        width={144}
        alt="StepUpp"
        priority
      />
    </div>
  );
};
export default Logo;
