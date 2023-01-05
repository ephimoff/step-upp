import { useField } from 'formik';

type ProfileInputProps = {
  label: string;
  placeholder: string;
  name: string;
  type: 'input';
  required?: boolean;
};

const ProfileInput = ({
  label,
  placeholder,
  required,
  ...props
}: ProfileInputProps) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <div className="flex items-baseline py-3">
      <label className="w-1/5 font-thin">{label} </label>
      <div className="w-4/5">
        <input
          placeholder={placeholder}
          required={required}
          {...field}
          className={`w-3/4 rounded-md border bg-slate-700 p-2 ${
            meta.touched && meta.error
              ? 'border-2 border-[#fc8181]'
              : 'border-gray-500'
          }`}
        />
        {meta.touched && meta.error ? (
          <div className="mt-1 text-sm font-normal text-[#fc8181]">
            {errorText}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default ProfileInput;
