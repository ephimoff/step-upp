import { getProviders, signIn, getSession } from 'next-auth/react';
import Head from 'next/head';
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

const SignIn = ({ providers }: any) => {
  console.log(providers);
  const router = useRouter();
  const { callbackUrl = '/', error: errorType } = router.query;

  const error = getErrorMessage(errorType as string);
  return (
    <>
      <Head>
        <title>Step-Upp. A tool to help you advance you career</title>
      </Head>
      <div className="bg-gradient-to-r from-cyan-500 to-fuchsia-500">
        <div className="flex h-screen items-center justify-center">
          <div className="w-96 rounded-xl bg-sky-400 p-10 shadow-xl">
            {error && (
              <div className="mb-2 rounded bg-gradient-to-r from-red-800 to-red-600 p-2 text-sm text-white">
                <p>{error}</p>
              </div>
            )}
            {Object.values(providers).map((provider: any) => (
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id)}
                  className="my-2 w-full rounded border bg-blue-500 py-1 hover:bg-blue-600"
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default SignIn;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  console.log('session:', session);
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
