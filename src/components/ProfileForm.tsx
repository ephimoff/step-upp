import { Formik } from 'formik';
import { useSession } from 'next-auth/react';

const ProfileForm = () => {
  const { data: session, status } = useSession();
  return (
    <Formik
      initialValues={{
        name: session!.user!.name,
        email: session!.user!.email,
        phone: '',
        twitter: '',
        linkedin: '',
        github: '',
      }}
      validate={(values) => {
        const errors = { email: '' };
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} method="post" className="text-black">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name as string}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email as string}
          />
          {errors.email && touched.email && errors.email}
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
          />
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.twitter}
          />
          <label htmlFor="linkedin">Linkedin</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.linkedin}
          />
          <label htmlFor="github">GitHub</label>
          <input
            type="text"
            id="github"
            name="github"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.github}
          />
          <button type="submit" disabled={isSubmitting}>
            Save
          </button>
        </form>
      )}
    </Formik>
  );
};
export default ProfileForm;
