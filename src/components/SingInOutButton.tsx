import { signIn, signOut } from 'next-auth/react';

type SignInOutButtonProps = {
  type: 'signin' | 'signout';
};

const SignInOutButton = ({ type }: SignInOutButtonProps) => {
  return (
    <button
      className="whitespace-nowrap rounded border px-4"
      onClick={() => {
        type === 'signin' ? signIn() : signOut();
      }}
    >
      {type === 'signin' ? 'Sign In' : 'Sign Out'}
    </button>
  );
};
export default SignInOutButton;
