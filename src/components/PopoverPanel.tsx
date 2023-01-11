import CustomButton from './CustomButton';
import { Field, Form, Formik } from 'formik';
import { scoreSchema } from '@/schemas/validationSchemas';
import { json } from 'stream/consumers';

type PopoverPanelProps = {
  type: 'self' | '360';
  value: number | null;
  profileId: string;
  skillId: string;
  setScore: any;
};

const PopoverPanel = ({
  type,
  value,
  profileId,
  skillId,
  setScore,
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
      }
      console.log('jsonResponse', jsonResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-sm text-white shadow-xl">
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
          : 'An absolute MVP. You can teach others and write books about it'}
      </span>
      <div className="flex">
        {type === 'self' ? (
          <Formik
            enableReinitialize
            initialValues={{
              score: value || '',
            }}
            validationSchema={scoreSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              console.log(values);
              updateScore(profileId, skillId, values.score as number);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              // handleChange,
              // handleBlur,
              // handleSubmit,
              isSubmitting,
            }) => (
              <Form className="flex justify-center">
                <Field
                  name="score"
                  type="text"
                  className="mr-2 w-1/3 rounded-md border bg-slate-700 py-1 text-center"
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
          //
          <CustomButton
            text={'Request assessment'}
            size={'small'}
            role={'secondary'}
          />
        )}
      </div>
    </div>
  );
};
export default PopoverPanel;
