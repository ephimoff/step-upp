import { MouseEventHandler } from 'react';

type CustomButtonProps = {
  text: string | React.ReactNode;
  onClick?: MouseEventHandler;
  fullWidth?: boolean;
  role?: 'secondary' | 'primary';
  size?: 'small';
  type?: 'button' | 'submit';
  disabled?: boolean;
};
const primary = `bg-gradient-to-r from-fuchsia-700 to-purple-500 hover:bg-gradient-to-l`;
const secondary = `bg-gradient-to-l from-[#00B4DB] to-[#0083B0] hover:bg-gradient-to-r`;

const CustomButton = ({
  text,
  onClick,
  fullWidth = false,
  role = 'primary',
  size,
  type = 'button',
  disabled = false,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      className={`cursor-pointer rounded-lg shadow-md  ${
        role === 'secondary' ? secondary : primary
      } ${fullWidth ? 'w-full ' : ''} ${
        size === 'small' ? 'px-2 text-sm' : 'p-2'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
export default CustomButton;
