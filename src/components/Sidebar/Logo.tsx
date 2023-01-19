import { HiOutlineBolt } from 'react-icons/hi2';

type LogoProps = {
  open: boolean;
};

const Logo = ({ open }: LogoProps) => {
  return (
    <div className="flex items-center gap-x-4">
      <span
        className={`rounded-xl bg-purple-500 p-2 text-3xl text-white duration-500 ${
          open && 'rotate-[360deg]'
        }`}
      >
        <HiOutlineBolt className="duration-500" size={32} />
      </span>
      <h1
        className={`${
          !open && 'scale-0'
        } origin-left whitespace-nowrap text-3xl font-medium duration-300`}
      >
        Step
        <strong
          className={`bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text font-extrabold text-black text-transparent`}
        >
          Upp
        </strong>
      </h1>
    </div>
  );
};
export default Logo;
