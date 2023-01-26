import { useField } from 'formik';
import { HiOutlineRefresh } from 'react-icons/hi';
import { generateUniqueSlug } from '@/utils/functions';

type InputAndLabelProps = {
  label: string;
  placeholder: string;
  name: string;
  type: 'input' | 'email';
  required?: boolean;
  initialName?: string;
  email?: string;
};

const InputAndLabel = ({
  label,
  placeholder,
  required,
  initialName,
  email,
  ...props
}: InputAndLabelProps) => {
  const [field, meta, helpers] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  function handleSlug() {
    const slug = generateUniqueSlug(field.value);
    helpers.setValue(slug);
  }
  return (
    <div className="flex items-baseline py-3">
      <label className="w-1/5 font-thin ">{label} </label>
      <div className="relative w-3/5">
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
        {field.name === 'slug' ? (
          <button
            type="button"
            onClick={handleSlug}
            className="absolute right-2 top-2 flex items-start text-gray-400"
          >
            <HiOutlineRefresh />
          </button>
        ) : null}
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
