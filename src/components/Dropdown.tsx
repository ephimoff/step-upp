import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CompetencyType } from '@/types/types';
import { HiCheck, HiOutlineSelector } from 'react-icons/hi';

interface CompetencyOption extends CompetencyType {
  id: string;
  name: string;
  unavailable: boolean;
}
type DropdownProps = {
  options: CompetencyOption[] | null;
  selected: any;
  setSelected: any;
};

const Dropdown = ({ options, selected, setSelected }: DropdownProps) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Button className="relative w-full max-w-xs cursor-pointer rounded-lg bg-white py-2.5 pl-3 pr-10 text-left shadow-md dark:bg-slate-800 sm:text-sm">
        <span className="block truncate">{selected.name}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <HiOutlineSelector
            className="h-5 w-5 text-purple-600"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full max-w-lg overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 sm:text-sm">
          {options?.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              disabled={option.unavailable}
              className={({ active, disabled }) =>
                `relative select-none py-2 pl-10 pr-4 ${
                  active
                    ? 'bg-purple-700 text-white'
                    : disabled
                    ? 'cursor-default text-gray-400 dark:text-gray-600'
                    : 'cursor-pointer text-gray-800 dark:text-white'
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    {option.name}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-500">
                      <HiCheck className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export default Dropdown;
