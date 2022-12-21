import { profileSchema } from '@/schemas/profileSchema';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
// import ProfileFormInputProps from '@/components/ProfileFormInput';

const ProfileForm = () => {
  const { data: session } = useSession();
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    touched,
  } = useFormik({
    initialValues: {
      name: session!.user!.name,
      email: session!.user!.email,
      phone: '',
      twitter: '',
      linkedin: '',
      github: '',
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const inputStyle = `w-3/4 rounded-md p-2 text-black`;
  const labelStyle = `w-1/4 font-thin`;
  const errorStyle = `w-3/4 font-thin text-red-500`;
  const rowStyle = `flex flex-row my-4 items-center`;
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
          className={inputStyle}
        />
      </div>
      <div className={errorStyle}>
        <span>{errors.name && touched.name && errors.name}</span>
      </div>
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
          className={inputStyle}
        />
      </div>
      <div className={errorStyle}>
        <span>{errors.email && touched.email && errors.email}</span>
      </div>
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
          className={inputStyle}
        />
      </div>
      <div className={errorStyle}>
        <span>{errors.phone && touched.phone && errors.phone}</span>
      </div>
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
          className={inputStyle}
          placeholder="https://example.com"
        />
      </div>
      <div className={errorStyle}>
        <span>{errors.twitter && touched.twitter && errors.twitter}</span>
      </div>
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
          className={inputStyle}
          placeholder="https://example.com"
        />
      </div>
      <div className={errorStyle}>
        <span>{errors.linkedin && touched.linkedin && errors.linkedin}</span>
      </div>
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
          className={inputStyle}
          placeholder="https://example.com"
        />
      </div>
      <div className={errorStyle}>
        <span>{errors.github && touched.github && errors.github}</span>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-2 shadow-md hover:bg-gradient-to-l"
      >
        Save
      </button>
    </form>
  );
};
export default ProfileForm;
