import { siteTitle } from '@/data/data';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
// import { useRouter } from 'next/router';

const Verify = () => {
  // const router = useRouter();

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
            <div className="my-4">
              An email has been sent to your email. Please check for the link
              there to log in.
            </div>
            <div className="">
              <Link
                href="/auth/signin"
                className="border-b border-b-purple-400 text-purple-400"
              >
                ← Go back to the login screen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Verify;

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
