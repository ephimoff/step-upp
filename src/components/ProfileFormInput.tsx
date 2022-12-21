import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';

type ProfileFormInputProps = {
  name: string;
  type: 'text' | 'email';
  // onChange: () => void;
  // onBlur: () => void;
  // value: string;
  // errors: { email: string; name: string };
  // touched: { email: string; name: string };
};

const ProfileFormInput = ({
  name,
  type,
}: // onChange,
// onBlur,
// value,
// errors,
// touched,
ProfileFormInputProps) => {
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
    // validationSchema: profileSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <label htmlFor={name} className="w-1/4 font-thin">
        {name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value as string}
        className="w-3/4 rounded-md p-2 text-black"
      />
      <span className="absolute w-3/4 font-thin text-red-500">
        {errors.email && touched.email && errors.email}
      </span>
    </>
  );
};
export default ProfileFormInput;
