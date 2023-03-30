import type { GetServerSidePropsContext } from 'next';
import { siteTitle } from '@/data/data';
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import { Form, Formik, Field } from 'formik';
import { emailSchema } from '@/schemas/validationSchemas';
import { log } from 'next-axiom';
import Head from 'next/head';
import CustomButton from '@/components/CustomButton';
import Image from 'next/image';
import logo from '@/assets/logo.png';

const errors: { [key: string]: any } = {
  Signin: 'Try singing in with a different account',
  OAuthSignin: 'Try singing in with a different account',
  OAuthCallback: 'An invalid response was returned from the OAuth provider',
  OAuthCreateAccount: 'Try singing in with a different account',
  EmailCreateAccount: 'Try singing in with a different account',
  Callback: 'Try singing in with a different account',
  OAuthAccountNotLinked:
    'It looks like you already logged with a different signin option. To continue, sign in with the same account you used originally to log in',
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
          <div className="w-96 rounded-xl bg-slate-700 p-10 shadow-xl">
            <div>
              <span className="flex justify-center font-thin text-white">
                Welcome to
              </span>

              <Image src={logo} className={`mx-auto w-2/3`} alt="StepUpp" />

              {/* <h1 className="flex justify-center bg-gradient-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59] bg-clip-text text-4xl font-bold text-transparent">
                Step<strong className="font-black">Upp</strong>
              </h1> */}
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
                      className="mt-4 w-full rounded-lg bg-gray-200 py-2 px-3 font-semibold text-purple-600 shadow-lg"
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
              <hr className="w-full border-[#26CD7D]" />
              <span className="px-4 font-light tracking-wider text-[#26CD7D]">
                or
              </span>
              <hr className="w-full border-[#26CD7D]" />
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

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const PAGE = 'SignIn';
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    log.info(`${PAGE} page - Session found`);
    log.debug(`${PAGE} page - Session: `, session);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  log.info(`${PAGE} page - Session not found`);

  return {
    props: { session },
  };
};
