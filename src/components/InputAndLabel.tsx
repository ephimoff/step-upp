import { useField } from 'formik';

type InputAndLabelProps = {
  label: string;
  placeholder: string;
  name: string;
  type: 'input' | 'email';
  required?: boolean;
};

const InputAndLabel = ({
  label,
  placeholder,
  required,
  ...props
}: InputAndLabelProps) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <div className="flex items-baseline justify-center py-3">
      <label className="w-1/5 font-thin ">{label} </label>
      <div className="w-3/5">
        <input
          placeholder={placeholder}
          required={required}
          {...field}
          className={`w-full rounded-md border bg-slate-700 px-2 py-1 ${
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
export default InputAndLabel;
