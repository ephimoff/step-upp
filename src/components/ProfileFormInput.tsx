import { useSession } from 'next-auth/react';

type ProfileFormInputProps = {
  name: string;
  type: 'text' | 'email';
  onChange: any;
  value: string;
  // errors: any;
};

const ProfileFormInput = ({
  name,
  type,
  onChange,
  value,
}: ProfileFormInputProps) => {
  const { data: session } = useSession();

  return (
    <div className="flex items-start py-3">
      <label htmlFor={name} className="w-1/5 font-thin">
        {name}
      </label>
      <div className="w-4/5">
        <input
          className="w-3/4 rounded-md border bg-slate-700 p-2"
          type={type}
          id={name}
          name="name"
          value={value}
          onChange={onChange}
        />
        <div className="mt-1 text-sm font-thin text-red-500">Error text</div>
      </div>
    </div>

    // <>
    //   <label htmlFor={name} className="w-1/4 font-thin">
    //     {name}
    //   </label>
    //   <input
    //     type={type}
    //     id={name}
    //     name={name}
    //     onChange={onChange}
    //     onBlur={onBlur}
    //     value={value as string}
    //     className="w-3/4 rounded-md p-2 text-black"
    //   />
    //   <span className="absolute w-3/4 font-thin text-red-500">
    //     {/* {errors.email && touched.email && errors.email} */}
    //   </span>
    // </>
  );
};
export default ProfileFormInput;
