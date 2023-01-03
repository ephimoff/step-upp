import { profileSchema } from '@/schemas/profileSchema';
import { useFormik, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { CiGlass } from 'react-icons/ci';
// import ProfileFormInputProps from '@/components/ProfileFormInput';

async function createProfile(profile: any) {
  try {
    const response = await fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify(profile),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
async function updateProfile(profile: any, where: string) {
  try {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      body: JSON.stringify({ profile, where }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

const ProfileForm = ({ profile }: any) => {
  const router = useRouter();
  // console.log('*** profile:');
  // console.log(profile);
  const { data: session } = useSession();
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    touched,
    setSubmitting,
  } = useFormik({
    initialValues: {
      name: session!.user!.name,
      email: session!.user!.email,
      phone: '',
      twitter: '',
      linkedin: '',
      github: '',
      user: { connect: { email: session!.user!.email } },
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      if (profile) {
        // profile exist, we need to update
        updateProfile(values, session!.user!.email as string);
        setSubmitting(false);
        window.location.href = '/profile';
      } else {
        // profile doesn't exist, we need to crreate a new one
        createProfile(values);
        setSubmitting(false);
        window.location.href = '/profile';
      }
    },
  });

  const inputStyle = `w-3/4 rounded-md p-2 bg-slate-700 border `;
  const labelStyle = `w-1/4 font-thin`;
  const errorStyle = `w-3/4 font-thin text-[#fc8181]`;
  const rowStyle = `flex flex-row my-4 items-center`;
  // console.log(values);
  return (
    <form onSubmit={handleSubmit} method="post" className="">
      <div className={rowStyle}>
        <label htmlFor="name" className={labelStyle}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name as string}
          className={`${inputStyle} ${
            errors.name && touched.name
              ? 'border-2 border-[#fc8181]'
              : 'border-gray-500'
          }`}
        />
      </div>
      {errors.name && touched.name && (
        <span className={errorStyle}>{errors.name}</span>
      )}
      <div className={rowStyle}>
        <label htmlFor="email" className={labelStyle}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email as string}
          className={`${inputStyle} ${
            errors.email && touched.email
              ? 'border-2 border-[#fc8181]'
              : 'border-gray-500'
          }`}
        />
      </div>
      {errors.email && touched.email && (
        <div className={errorStyle}>{errors.email}</div>
      )}
      <div className={rowStyle}>
        <label htmlFor="phone" className={labelStyle}>
          Phone
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.phone}
          className={`${inputStyle} ${
            errors.phone && touched.phone
              ? 'border-2 border-[#fc8181]'
              : 'border-gray-500'
          }`}
        />
      </div>
      {errors.phone && touched.phone && (
        <span className={errorStyle}>{errors.phone}</span>
      )}
      <div className={rowStyle}>
        <label htmlFor="twitter" className={labelStyle}>
          Twitter
        </label>
        <input
          type="text"
          id="twitter"
          name="twitter"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.twitter}
          className={`${inputStyle} ${
            errors.twitter && touched.twitter
              ? 'border-2 border-[#fc8181]'
              : 'border-gray-500'
          }`}
          placeholder="https://example.com"
        />
      </div>
      {errors.twitter && touched.twitter && (
        <span className={errorStyle}>{errors.twitter}</span>
      )}
      <div className={rowStyle}>
        <label htmlFor="linkedin" className={labelStyle}>
          Linkedin
        </label>
        <input
          type="text"
          id="linkedin"
          name="linkedin"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.linkedin}
          className={`${inputStyle} ${
            errors.linkedin && touched.linkedin
              ? 'border-2 border-[#fc8181]'
              : 'border-gray-500'
          }`}
          placeholder="https://example.com"
        />
      </div>
      {errors.linkedin && touched.linkedin && (
        <span className={errorStyle}>{errors.linkedin}</span>
      )}
      <div className={rowStyle}>
        <label htmlFor="github" className={labelStyle}>
          GitHub
        </label>
        <input
          type="text"
          id="github"
          name="github"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.github}
          className={`${inputStyle} ${
            errors.github && touched.github
              ? 'border-2 border-[#fc8181]'
              : 'border-gray-500'
          }`}
          placeholder="https://example.com"
        />
      </div>
      {errors.github && touched.github && (
        <span className={errorStyle}>{errors.github}</span>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`${
          isSubmitting && 'opacity-40'
        }  w-full rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-2 shadow-md hover:bg-gradient-to-l`}
      >
        {profile ? 'Update profile' : 'Save new profile'}
      </button>
    </form>
  );
};
export default ProfileForm;
