import { Fragment, ReactNode } from "react";
import { Dialog as DialogComponent, Transition } from "@headlessui/react";

type Props = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

const Dialog = ({ children, open, onClose }: Props) => {
  return (
    <Transition show={open} as={Fragment}>
      <DialogComponent onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogComponent.Panel className="mx-auto max-w-sm rounded bg-white dark:bg-[#262B3C] dark:text-white px-8 py-4">
                {children}
              </DialogComponent.Panel>
            </div>
          </div>
        </Transition.Child>
      </DialogComponent>
    </Transition>
  );
};

export default Dialog;
