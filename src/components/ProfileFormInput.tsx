import { useSession } from 'next-auth/react';

type ProfileFormInputProps = {
  name: string;
  type: 'text' | 'email';
  onChange: any;
  onBlur: any;
  value: string;
  errors: any;
  touched: any;
};

const ProfileFormInput = ({
  name,
  type,
  onChange,
  onBlur,
  value,
  errors,
  touched,
}: ProfileFormInputProps) => {
  const { data: session } = useSession();
  console.log(errors);
  console.log(touched);
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
        {/* {errors.email && touched.email && errors.email} */}
      </span>
    </>
  );
};
export default ProfileFormInput;
