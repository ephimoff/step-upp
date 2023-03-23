import { Form, Formik } from 'formik';
import { Save, Check } from 'lucide-react';
import { useState } from 'react';
import * as yup from 'yup';
import CustomButton from './CustomButton';
import InputAndLabel from './InputAndLabel';

interface FieldI {
  name: string;
  label: string;
  value: string;
  type: any;
}

type Props = {
  fields: FieldI[];
  onSubmit: any;
};

const FormikForm = ({ fields, onSubmit }: Props) => {
  const [success, setSuccess] = useState(false);

  const initialValues = Object.fromEntries(
    fields.map((field) => [field.name, field.value])
  );

  const SchemaObject = Object.fromEntries(
    fields.map((field) => [field.name, field.type])
  );
  const validationSchema = yup.object().shape(SchemaObject);

  const submitForm = async (values: any) => {
    const response = await onSubmit(values);
    if (response.status === 200) {
      setSuccess(true);
    }
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          submitForm(values);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <div>
              {fields.map(({ label, name }, index) => {
                return (
                  <div key={index}>
                    <InputAndLabel
                      label={label}
                      placeholder={label}
                      name={name}
                      type="input"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex items-center">
              <CustomButton
                disabled={isSubmitting || Object.keys(errors).length !== 0}
                text="Update"
                role="secondary"
                type="submit"
                icon={<Save size={16} />}
              />
              {success ? (
                <span className="animate-fade-out text-[#00B4DB] opacity-0">
                  <Check />
                </span>
              ) : null}
            </div>
            <div>
              <pre className="text-xs font-thin text-red-500 dark:text-white">
                {JSON.stringify(errors, null, 2)}
              </pre>
              <pre className="text-xs font-thin text-black dark:text-white">
                {JSON.stringify(values, null, 2)}
              </pre>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default FormikForm;
