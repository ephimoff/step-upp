import { MouseEventHandler } from 'react';

type CustomButtonProps = {
  text: string | React.ReactNode;
  onClick?: MouseEventHandler;
  fullWidth?: boolean;
  role?: 'secondary' | 'primary' | 'noborder' | 'red' | 'google' | 'github';
  size?: 'small';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode | string;
  iconAfter?: boolean;
  outline?: boolean;
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
  outline = false,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      className={`btn group
      ${
        role === 'noborder'
          ? 'btn-noborder'
          : role === 'red'
          ? 'btn-alert'
          : role === 'secondary'
          ? 'btn-secondary'
          : role === 'google'
          ? 'bg-red-700 text-white'
          : role === 'github'
          ? 'bg-white text-black'
          : 'btn-primary'
      }
      ${size === 'small' ? 'btn-sm' : null}
      ${fullWidth ? 'w-full' : null}
      ${outline ? 'btn-outline' : null}
      ${disabled ? 'btn-disabled' : null}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && !iconAfter ? (
        <span
          className={`mr-1 transition duration-700 ${
            !disabled && 'group-hover:animate-bounce'
          }`}
        >
          {icon}
        </span>
      ) : null}
      <span>{text}</span>
      {icon && iconAfter ? (
        <span
          className={`ml-1 transition duration-700 ${
            !disabled && 'group-hover:animate-bounce'
          }`}
        >
          {icon}
        </span>
      ) : null}
    </button>
  );
};
export default CustomButton;
