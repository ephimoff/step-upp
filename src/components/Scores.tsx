import { Formik, Field, Form, FieldArray } from 'formik';
import CustomButton from './CustomButton';

type ScoresProps = {
  skills: any;
};

const Scores = ({ skills }: ScoresProps) => {
  const initialFields = {};
  const extraFields = skills.map((e: any) => {
    return {
      [e.skillId]: '',
    };
  });

  const validate = (value: any) => {
    let errorMessage;
    if (isNaN(Number(value))) {
      errorMessage = 'Only numbers are accepted';
    }
    if (!value) {
      errorMessage = 'Required';
    }
    if (Number(value) < 1 || Number(value) > 10) {
      errorMessage = 'Please submit a number >= 1 and <=10 ';
    }
    return errorMessage;
  };

  return (
    <div>
      <Formik
        initialValues={Object.assign(initialFields, ...extraFields)}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className="">
            <div>
              {skills?.map((element: any, index: number) => {
                return (
                  <div key={index}>
                    <span>{element.skill.name}</span>
                    <Field
                      name={element.skillId}
                      type="text"
                      className="mr-2 w-1/3 rounded-md border bg-slate-700 py-1 text-center"
                      placeholder="0"
                      validate={validate}
                    />
                    {errors[element.skillId] && touched[element.skillId] ? (
                      <div>{errors[element.skillId] as string}</div>
                    ) : null}
                  </div>
                );
              })}
              <pre className="text-sm font-thin text-white">
                {JSON.stringify(values, null, 2)}
              </pre>
              <pre className="text-sm font-thin text-red-500">
                {JSON.stringify(errors, null, 2)}
              </pre>
              <CustomButton
                disabled={isSubmitting}
                text={'Submit score'}
                type={'submit'}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
    // <div className="flex items-baseline py-3">
    //   <label className="w-2/5 font-thin ">{skill.name} </label>
    //   <div>
    //     <input
    //       type="text"
    //       placeholder="7"
    //       maxLength={2}
    //       size={2}
    //       {...field}
    //       className={`w-20 rounded-md border ${
    //         meta.touched && meta.error
    //           ? 'border-2 border-[#fc8181]'
    //           : 'border-gray-400'
    //       } bg-slate-300 px-2 py-1 text-center dark:border-gray-700 dark:bg-slate-900`}
    //     />
    //     {meta.touched && meta.error ? (
    //       <div className="mt-1 text-sm font-normal text-[#fc8181]">
    //         {errorText}
    //       </div>
    //     ) : null}
    //   </div>
    // </div>
  );
};
export default Scores;
