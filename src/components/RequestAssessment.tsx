import { Send, Check } from 'lucide-react';
import CustomButton from './CustomButton';
import { Field, Form, Formik } from 'formik';
import { emailSchema } from '@/schemas/validationSchemas';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

type Props = {
  requestorName: string;
  slug: string;
};

const RequestAssessment = ({ requestorName, slug }: Props) => {
  const { data: session } = useSession();
  // console.log(session);
  const [success, setSuccess] = useState(false);

  const requestAssessment = async (
    email: string,
    requestorName: string,
    requestorEmail: string,
    slug: string
  ) => {
    try {
      const response = await fetch('/api/accesstoken', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          requestorName: requestorName,
          requestorEmail: requestorEmail,
          slug: slug,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setSuccess(true);
      }
      // console.log('response', response);
      const jsonResponse = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        requestorName: session!.user!.name || requestorName || '',
        requestorEmail: session!.user!.email || '',
        slug: slug || '',
      }}
      validationSchema={emailSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        requestAssessment(
          values.email,
          values.requestorName,
          values.requestorEmail,
          values.slug
        );
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form className="align-center w-full flex-row">
          <Field
            name="email"
            type="text"
            className={`input  ${
              Object.keys(errors).length !== 0
                ? 'border-2 border-[#fc8181]'
                : ' border-gray-400 '
            }`}
            placeholder="example@email.com"
          />
          {errors && touched && (
            <div className="text-sm font-normal text-[#fc8181]">
              {errors.email}
            </div>
          )}

          <div className="mt-2">
            <CustomButton
              disabled={isSubmitting || Object.keys(errors).length !== 0}
              type="submit"
              text="Request assessment"
              role="secondary"
              icon={<Send size={16} />}
              fullWidth
            />
          </div>

          {success ? (
            <div className="animate-fade-out mt-2 flex items-center text-xs text-[#00B4DB] opacity-0">
              <Check /> Request submitted
            </div>
          ) : null}

          {/* <pre className="text-sm font-thin text-black dark:text-white">
            {JSON.stringify(values, null, 2)}
          </pre>
          <pre className="text-sm font-thin text-red-500">
            {JSON.stringify(errors, null, 2)}
          </pre> */}
        </Form>
      )}
    </Formik>
  );
};
export default RequestAssessment;
