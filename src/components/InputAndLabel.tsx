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
};

const InputAndLabel = ({
  label,
  placeholder,
  required,
  initialName,
  type,
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
      <label className="w-2/6 text-sm font-thin sm:text-base">{label} </label>
      <div className="relative w-3/6">
        <input
          placeholder={placeholder}
          required={required}
          disabled={type === 'email'}
          {...field}
          className={`input ${
            meta.touched && meta.error
              ? 'border-2 border-[#fc8181]'
              : 'border-gray-400'
          } ${
            type === 'email' &&
            'border-dotted border-gray-300 bg-gray-100 text-gray-500 dark:border-gray-400 dark:bg-gray-800 dark:text-gray-400'
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
