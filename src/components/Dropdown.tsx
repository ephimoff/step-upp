import { Listbox, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
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
      <Listbox.Button className="relative w-full max-w-xs cursor-pointer rounded-lg bg-gray-900 py-2.5 pl-3 pr-10 text-left shadow-md sm:text-sm">
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
        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full max-w-lg overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options?.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              disabled={option.unavailable}
              className={({ active, disabled }) =>
                `relative select-none py-2 pl-10 pr-4 ${
                  active
                    ? 'bg-gray-700'
                    : disabled
                    ? 'cursor-default text-gray-700'
                    : 'cursor-pointer text-white'
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
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
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
