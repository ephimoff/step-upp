import { HiOutlineBolt } from 'react-icons/hi2';

type LogoProps = {
  open: boolean;
};

const Logo = ({ open }: LogoProps) => {
  return (
    <div className="flex items-center gap-x-4">
      <span
        className={`rounded-xl bg-gradient-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59] p-2 text-3xl text-white duration-500 ${
          open && 'rotate-[360deg]'
        }`}
      >
        <HiOutlineBolt className="duration-500" size={32} />
      </span>
      <h1
        className={`${
          !open && 'scale-0'
        } origin-left whitespace-nowrap bg-gradient-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59] bg-clip-text text-3xl font-medium text-transparent duration-300`}
      >
        Step
        <strong className={`font-extrabold`}>Upp</strong>
      </h1>
    </div>
  );
};
export default Logo;
