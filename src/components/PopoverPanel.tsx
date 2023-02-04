import CustomButton from './CustomButton';
import { Field, Form, Formik } from 'formik';
import { scoreSchema } from '@/schemas/validationSchemas';

type PopoverPanelProps = {
  type: 'self' | 'feedback';
  value: number | null;
  profileId: string;
  skillId: string;
  setScore: any;
  close: any;
  scores?: any;
};

const PopoverPanel = ({
  type,
  value,
  profileId,
  skillId,
  setScore,
  close,
  scores,
}: PopoverPanelProps) => {
  const updateScore = async (
    profileId: string,
    skillId: string,
    score: number | null
  ) => {
    if (!score) {
      return null;
    }

    try {
      const response = await fetch('/api/score', {
        method: 'PUT',
        body: JSON.stringify({
          profileId: profileId,
          skillId: skillId,
          score: Number(score),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonResponse = await response.json();
      if (jsonResponse.count > 0) {
        setScore(score);
        close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid w-full rounded-xl bg-white text-sm shadow-xl dark:bg-slate-800">
      <div className="w-full rounded-t-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-white">
        <div>
          <strong
            className={`${
              value! <= 2
                ? 'text-red-400'
                : value! <= 4
                ? 'text-orange-400'
                : value! <= 6
                ? 'text-yellow-400'
                : value! <= 8
                ? 'text-green-400'
                : 'text-cyan-400'
            } text-xs`}
          >
            {!value ? '???' : `${value} out of 10:`}
          </strong>
        </div>
        <div>
          <span>
            {!value
              ? 'No assessment yet'
              : value <= 2
              ? 'Very high-level knowledge. No practical experience'
              : value <= 4
              ? 'Maybe used the skill once or twice'
              : value <= 6
              ? 'Can finish all the assigned tasks'
              : value <= 8
              ? 'Can use this skill in the work without any guidence from the side'
              : 'An absolute MVP. Can teach others and write books about it'}
          </span>
        </div>
      </div>

      <div className="flex p-4">
        {type === 'self' ? (
          <Formik
            enableReinitialize
            initialValues={{
              score: value || '',
            }}
            validationSchema={scoreSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              updateScore(profileId, skillId, values.score as number);
              setSubmitting(false);
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form className="flex w-full justify-center">
                <Field
                  name="score"
                  type="text"
                  className="mr-2 w-1/5 rounded-md border border-gray-400 bg-slate-300  py-1 px-2 text-center dark:border-gray-700 dark:bg-slate-900"
                  placeholder="10"
                />
                <CustomButton
                  disabled={isSubmitting}
                  text={'Update'}
                  size={'small'}
                  role={'secondary'}
                  type={'submit'}
                />
              </Form>
            )}
          </Formik>
        ) : (
          <div>
            {scores ? (
              <div className="text-gray-600 dark:text-gray-400">
                <p>
                  This number is an average based on{' '}
                  <strong>{scores.length}</strong> reviews:
                </p>
                <ul className="mt-2">
                  {scores.map((e: any, index: number) => {
                    return (
                      <li key={index} className="mb-2 ml-4 list-disc">
                        <strong>{e.score}</strong> by{' '}
                        <span>{e.appraiser.name}</span> rated on{' '}
                        {new Intl.DateTimeFormat('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: '2-digit',
                        }).format(new Date(e.date))}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            <CustomButton text={'Request assessment'} role={'secondary'} />
          </div>
        )}
      </div>
    </div>
  );
};
export default PopoverPanel;
