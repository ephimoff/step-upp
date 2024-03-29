import CustomButton from './CustomButton';
import { Field, Form, Formik } from 'formik';
import { scoreSchema } from '@/schemas/validationSchemas';
import { Save, Check } from 'lucide-react';
import { useState } from 'react';
import RequestAssessment from './RequestAssessment';

type PopoverPanelProps = {
  type: 'self' | 'feedback';
  value: number | null;
  profileId: string;
  skillId: string;
  setScore: any;
  close: any;
  scores?: any;
  isSameProfile?: boolean;
  requestorName?: string;
  slug?: string;
};

const PopoverPanel = ({
  type,
  value,
  profileId,
  skillId,
  setScore,
  close,
  scores,
  isSameProfile,
  requestorName,
  slug,
}: PopoverPanelProps) => {
  const [success, setSuccess] = useState(false);
  // console.log('isSameProfile', isSameProfile);

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
        setSuccess(true);
        setTimeout(() => {
          close();
        }, 1000);
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
          <div>
            {isSameProfile && (
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
                  <Form className="flex items-center justify-center">
                    <Field
                      name="score"
                      type="text"
                      className="input input-short mr-2"
                      placeholder="10"
                    />
                    <CustomButton
                      disabled={isSubmitting}
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
                  </Form>
                )}
              </Formik>
            )}
          </div>
        ) : (
          <div className="w-full">
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
            {isSameProfile && (
              <RequestAssessment
                requestorName={requestorName as string}
                slug={slug as string}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default PopoverPanel;
