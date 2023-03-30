import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Rubik } from '@next/font/google';
import CustomButton from './CustomButton';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: any;
};

const Modal = ({ children, isOpen, closeModal }: Props) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`${rubik.variable} w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle font-sans shadow-xl transition-all dark:bg-slate-800`}
                >
                  {/* <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title> */}
                  {children}
                  <div className="mt-4">
                    <CustomButton text="Close" onClick={closeModal} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Modal;