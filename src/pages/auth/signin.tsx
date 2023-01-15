import { siteTitle } from '@/data/data';
import { signIn, getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CustomButton from '@/components/CustomButton';
import { Form, Formik, Field } from 'formik';
import { emailSchema } from '@/schemas/validationSchemas';

const errors: { [key: string]: any } = {
  Signin: 'Try singing in with a different account',
  OAuthSignin: 'Try singing in with a different account',
  OAuthCallback: 'Try singing in with a different account',
  OAuthCreateAccount: 'Try singing in with a different account',
  EmailCreateAccount: 'Try singing in with a different account',
  Callback: 'Try singing in with a different account',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally to log in',
  EmailSignin: 'Sending the e-mail with the verification token failed',
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

const SignIn = () => {
  const router = useRouter();
  const { callbackUrl = '/', error: errorType } = router.query;
  const error = getErrorMessage(errorType as string);
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="bg-gradient-to-r from-cyan-500 to-fuchsia-500">
        <div className="flex h-screen items-center justify-center">
          <div className="w-96 rounded-xl bg-sky-900 p-10 shadow-xl">
            <div>
              <span className="text- flex justify-center font-thin">
                Welcome to
              </span>
              <h1 className="flex justify-center bg-gradient-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59] bg-clip-text text-4xl font-bold text-transparent">
                Step<strong className="font-black">Upp</strong>
              </h1>
            </div>
            {error && (
              <div className="m-2 mx-0 w-full rounded bg-gradient-to-r from-red-800 to-red-600 p-2 text-center text-sm text-white">
                <p>{error}</p>
              </div>
            )}

            <Formik
              enableReinitialize
              initialValues={{
                email: '',
              }}
              validationSchema={emailSchema}
              onSubmit={({ email }, { setSubmitting }) => {
                setSubmitting(true);
                signIn('email', { email, callbackUrl: callbackUrl.toString() });
                setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form className="">
                  <div className="my-4">
                    <Field
                      name="email"
                      type="email"
                      className="mt-4 w-full rounded-lg py-2 px-3 font-semibold text-purple-600 shadow-lg"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <CustomButton
                      disabled={isSubmitting}
                      text="Continue with Email"
                      fullWidth
                      type="submit"
                    />
                  </div>
                </Form>
              )}
            </Formik>
            <div className="mb-6 flex items-center justify-between pt-6">
              <hr className="w-full border-sky-300" />
              <span className="px-4 font-light tracking-wider text-sky-300">
                or
              </span>
              <hr className="w-full border-sky-300" />
            </div>
            <div key="google">
              <CustomButton
                text="Sign in with Google"
                role="secondary"
                fullWidth
                onClick={() =>
                  signIn('google', { callbackUrl: callbackUrl.toString() })
                }
              />
            </div>
            <div key="github" className="my-4">
              <CustomButton
                text="Sign in with GitHub"
                role="secondary"
                fullWidth
                onClick={() =>
                  signIn('github', { callbackUrl: callbackUrl.toString() })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignIn;

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
  // const providers = await getProviders();
  return {
    props: { session },
  };
}
