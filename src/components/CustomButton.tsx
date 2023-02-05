import { MouseEventHandler } from 'react';

type CustomButtonProps = {
  text: string | React.ReactNode;
  onClick?: MouseEventHandler;
  fullWidth?: boolean;
  role?: 'secondary' | 'primary' | 'noborder' | 'red';
  size?: 'small';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode | string;
  iconAfter?: boolean;
};
// const primary = `bg-gradient-to-r from-fuchsia-700 to-purple-500 hover:bg-gradient-to-l`;
// const secondary = `bg-gradient-to-l from-[#00B4DB] to-[#0083B0] hover:bg-gradient-to-r`;

const CustomButton = ({
  text,
  onClick,
  fullWidth = false,
  role,
  size,
  type = 'button',
  disabled = false,
  icon,
  iconAfter = false,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      className={`mr-2 flex cursor-pointer items-center justify-center whitespace-nowrap rounded bg-white px-4 font-semibold transition duration-300 ease-in-out
      ${
        role === 'noborder'
          ? ' bg-transparent text-purple-500 hover:bg-purple-700 hover:text-white dark:bg-transparent dark:hover:bg-purple-700'
          : role === 'red'
          ? 'bg-transparent text-red-400 hover:text-red-500 dark:border-none dark:bg-transparent dark:text-red-800 dark:hover:text-red-500'
          : role === 'secondary'
          ? 'border-2 border-[#00B4DB] text-[#0083B0] shadow-sm hover:bg-[#00B4DB] hover:text-white dark:bg-slate-900 dark:hover:bg-[#00B4DB]'
          : 'border-2 border-purple-600 text-black shadow-sm hover:bg-purple-700 hover:text-white dark:bg-slate-900 dark:text-white dark:hover:bg-purple-700'
      }
      ${size === 'small' ? 'py-0' : 'py-2'}
      ${fullWidth ? 'w-full' : null}
      ${disabled ? 'cursor-auto opacity-40 dark:hover:bg-slate-900' : null}

      `}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && !iconAfter ? <span className="mr-1">{icon}</span> : null}
      <span>{text}</span>
      {icon && iconAfter ? <span className="ml-1">{icon}</span> : null}
    </button>
  );
};
export default CustomButton;
