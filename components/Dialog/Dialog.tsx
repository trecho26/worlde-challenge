import { Fragment, useRef } from "react";
import { Dialog as DialogComponent, Transition } from "@headlessui/react";
import DialogContent from "./DialogContent";

type Props = {
  open: boolean;
  onClose: () => void;
  onClick: () => void;
};

const Dialog = ({ open, onClose, onClick }: Props) => {
  const playButtonRef = useRef(null);
  return (
    <Transition show={open} as={Fragment}>
      <DialogComponent onClose={onClose} initialFocus={playButtonRef}>
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
              <DialogComponent.Panel className="mx-auto max-w-sm rounded bg-white px-8 py-4">
                <DialogContent />
                <div className="flex justify-center">
                  <button
                    ref={playButtonRef}
                    onClick={onClick}
                    className="bg-wordGreen text-white font-semibold rounded w-1/2 py-1"
                  >
                    !JUGAR¡
                  </button>
                </div>
              </DialogComponent.Panel>
            </div>
          </div>
        </Transition.Child>
      </DialogComponent>
    </Transition>
  );
};

export default Dialog;
