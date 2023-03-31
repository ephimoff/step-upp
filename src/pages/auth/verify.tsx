import type { GetServerSidePropsContext } from 'next';
import { siteTitle } from '@/data/data';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import Head from 'next/head';
import Link from 'next/link';

const Verify = () => {
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
              <Image src={logo} className={`mx-auto w-2/3`} alt="StepUpp" />
              {/* <h1 className="flex justify-center bg-gradient-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59] bg-clip-text text-4xl font-bold text-transparent">
                Step<strong className="font-black">Upp</strong>
              </h1> */}
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

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const PAGE = 'Verify';
  // const session = await getSession(context);
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
