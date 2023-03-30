import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import { log } from 'next-axiom';
import CustomButton from './CustomButton';

type ScoresProps = {
  skills: any;
  appraiseeId: string;
  appraiserId: string;
};

const Scores = ({ skills, appraiseeId, appraiserId }: ScoresProps) => {
  const [success, setSuccess] = useState(false);
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

  const submitScore = async (
    values: any,
    appraiseeId: string,
    appraiserId: string
  ) => {
    // converting an object to an array of objects
    // also converting string values to numbers
    const scores = Object.entries(values).map((e) => {
      const obj = {
        skillId: e[0],
        score: Number(e[1]),
      };
      return obj;
    });
    const reqBody = {
      appraiseeId: appraiseeId,
      appraiserId: appraiserId,
      scores: scores,
    };
    const functionName = 'submitScore';
    const url = '/api/feedbackscore';
    const method = 'POST';
    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonResponse = await response.json();
      log.info(
        `${functionName} function -  ${method} ${url} response: ${response.status}`
      );
      if (response.status < 300) {
        log.debug(
          `${functionName} function - ${method} ${url} response: `,
          response
        );
        setSuccess(true);
      }
    } catch (error) {
      log.error(`${functionName} function - ${method} ${url} error: ${error}`);
    }
  };

  return (
    <div>
      <Formik
        initialValues={Object.assign(initialFields, ...extraFields)}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          submitScore(values, appraiseeId, appraiserId);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className="">
            <div>
              {skills?.map((element: any, index: number) => {
                return (
                  <div key={index} className="flex items-baseline py-3">
                    <label className="w-3/5 font-thin">
                      {element.skill.name}
                    </label>
                    <div>
                      <Field
                        name={element.skillId}
                        type="text"
                        className={`w-20 rounded-md border ${
                          touched[element.skillId] && errors[element.skillId]
                            ? 'border-2 border-[#fc8181]'
                            : 'border-gray-400 dark:border-gray-700'
                        } bg-slate-300 px-2 py-1 text-center dark:bg-slate-900`}
                        placeholder="0"
                        validate={validate}
                      />
                      {errors[element.skillId] && touched[element.skillId] ? (
                        <div className="mt-1 text-sm font-normal text-[#fc8181]">
                          {errors[element.skillId] as string}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              {/* <pre className="text-sm font-thin text-black dark:text-white">
                {JSON.stringify(values, null, 2)}
              </pre>
              <pre className="text-sm font-thin text-red-500">
                {JSON.stringify(errors, null, 2)}
              </pre> */}
              <CustomButton
                disabled={isSubmitting}
                text={'Submit score'}
                type={'submit'}
              />
              {success ? (
                <span className="animate-fade-out text-purple-500 opacity-0">
                  Score submitted
                </span>
              ) : null}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Scores;
