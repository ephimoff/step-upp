// import Sidebar from '@/components/Sidebar/Sidebar';
import { getSession } from 'next-auth/react';
import React from 'react';
import prisma from '@/utils/prisma';
import type { ProfileType } from '@/types/types';
import Head from 'next/head';
import { siteTitle } from '@/data/data';
import Card from '@/components/Card';
import { Field, Form, Formik } from 'formik';
import CustomButton from '@/components/CustomButton';
import { companyNameSchema } from '@/schemas/validationSchemas';
import { useSession } from 'next-auth/react';
import type { GetServerSidePropsContext } from 'next';

import { suggestName } from '@/utils/functions';

type Props = {
  profile: ProfileType;
};

const CompanyPage = ({ profile }: Props) => {
  const { data: session } = useSession();
  const suggestedName = suggestName(session?.user?.email as string);
  console.log('suggestedName', suggestedName);
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="flex h-screen items-center justify-center">
        <Card>
          <h2>It looks like you are the first employee from your company.</h2>
          <h3>Please pick a name for your company to continue:</h3>
          <Formik
            enableReinitialize
            initialValues={{
              name: suggestedName || '',
            }}
            validationSchema={companyNameSchema}
            onSubmit={({ name }, { setSubmitting }) => {
              setSubmitting(true);
              // signIn('email', { email, callbackUrl: callbackUrl.toString() });
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
                    name="name"
                    type="text"
                    className="mt-4 w-full rounded-lg bg-gray-200 py-2 px-3 font-semibold text-purple-600 shadow-lg"
                    placeholder="..."
                  />
                </div>
                <div>
                  <CustomButton
                    disabled={isSubmitting}
                    text="Save and continue"
                    fullWidth
                    type="submit"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </>
  );
};
export default CompanyPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const PAGE = 'Company';
  const session = await getSession(context);

  if (!session) {
    console.info(
      `${PAGE} page - Session not found. Redirecting to /auth/signin`
    );
    return {
      redirect: {
        destination: '/auth/signin',
      },
    };
  }
  console.info(`${PAGE} page - Session found`);
  console.debug(`${PAGE} page - Session: `, session);

  const profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email as string,
    },
  });

  return {
    props: { session, profile },
  };
};
