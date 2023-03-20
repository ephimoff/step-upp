import { Field, Form, Formik } from 'formik';
import { Send, Check } from 'lucide-react';
import { useState } from 'react';
import CustomButton from './CustomButton';
import InputAndLabel from './InputAndLabel';

interface FieldI {
  label: string;
  value: string;
}

type Props = {
  fields: FieldI[];
};

const FormikForm = ({ fields }: Props) => {
  const [success, setSuccess] = useState(false);
  const initialFields = {};
  const extraFields = fields.map((field: any, index: number) => {
    return {
      [index]: field.value,
    };
  });
  const temp = Object.assign(initialFields, ...extraFields);
  console.log('extraFields', extraFields);
  console.log('temp', temp);
  const submitForm = async (values: any) => {
    setSuccess(true);
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={Object.assign(initialFields, ...extraFields)}
        // validationSchema={scoreSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          submitForm(values);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <div>
              {fields.map((field, index) => {
                return (
                  <div key={index}>
                    <InputAndLabel
                      label={field.label}
                      placeholder={field.label}
                      name={Object.keys(values)[index]}
                      type="input"
                    />
                  </div>
                );
              })}
            </div>
            <CustomButton
              disabled={isSubmitting}
              text="Update"
              role="secondary"
              type="submit"
              icon={<Send size={16} />}
            />
            {success ? (
              <span className="animate-fade-out text-[#00B4DB] opacity-0">
                <Check />
              </span>
            ) : null}
            <pre className="text-xs font-thin text-black dark:text-white">
              {JSON.stringify(values, null, 2)}
            </pre>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default FormikForm;
