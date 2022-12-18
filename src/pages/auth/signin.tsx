import { getProviders, signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const errors: { [key: string]: any } = {
  Signin: 'Try singing in with a different account',
  OAuthSignin: 'Try singing in with a different account',
  OAuthCallback: 'Try singing in with a different account',
  OAuthCreateAccount: 'Try singing in with a different account',
  EmailCreateAccount: 'Try singing in with a different account',
  Callback: 'Try singing in with a different account',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally to log in',
  EmailSignin: 'Check your email inbox',
  CredentialsSignin:
    'Sign in failed. Check the details you provided are correct',
  SessionRequired: 'Please sign in to access this page',
  Default: 'Unable to sing in',
};

const getErrorMessage = (errorType: string) => {
  if (!errorType) return;
  return errorType === 'SessionRequired'
    ? ''
    : errors[errorType]
    ? errors[errorType]
    : errors.default;
};

export default function SignIn({ providers }: any) {
  const router = useRouter();
  const { callbackUrl = '/', error: errorType } = router.query;

  const error = getErrorMessage(errorType as string);
  return (
    <>
      {error && (
        <div className="bg-red-400 text-white">
          <p>{error}</p>
        </div>
      )}
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
