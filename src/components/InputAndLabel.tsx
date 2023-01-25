import { useField } from 'formik';
import { HiOutlineRefresh } from 'react-icons/hi';

type InputAndLabelProps = {
  label: string;
  placeholder: string;
  name: string;
  type: 'input' | 'email';
  required?: boolean;
  button?: boolean;
};

const InputAndLabel = ({
  label,
  placeholder,
  required,
  button,
  ...props
}: InputAndLabelProps) => {
  const [field, meta, helpers] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  function handleSlug() {
    // console.log(field);
    // console.log(meta);
    // console.log(helpers);
    helpers.setValue('blah');
  }
  return (
    <div className="flex items-baseline py-3">
      <label className="w-1/5 font-thin ">{label} </label>
      <div className="w-3/5">
        <input
          placeholder={placeholder}
          required={required}
          {...field}
          className={`w-full rounded-md border bg-slate-300 px-2 py-1 dark:border-gray-700 dark:bg-slate-900 ${
            meta.touched && meta.error
              ? 'border-2 border-[#fc8181]'
              : 'border-gray-400'
          }`}
        />
        {meta.touched && meta.error ? (
          <div className="mt-1 text-sm font-normal text-[#fc8181]">
            {errorText}
          </div>
        ) : null}
      </div>
      {button ? (
        <div className="w-1/5 pl-2 text-gray-400">
          <button type="button" onClick={handleSlug}>
            <HiOutlineRefresh />
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default InputAndLabel;
