import { Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { ALERT_SEVERITY } from "@/types/wordleTypes";
import clsx from "clsx";
import SuccessIcon from "./icons/SuccessIcon";
import ErrorIcon from "./icons/ErrorIcon";
import WarningIcon from "./icons/WarningIcon";
import InfoIcon from "./icons/InfoIcon";

type Props = {
  isOpen: boolean;
  message: string;
  duration: number;
  severity?: ALERT_SEVERITY;
  onClose: () => void;
};

const Alert = ({ isOpen, message, duration, severity, onClose }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          role="alert"
          className={clsx(
            "absolute top-10 left-[50%] -translate-x-[50%] shadow rounded-xl border   bg-white p-4 dark:bg-gray-800  dark:text-white",
            {
              "border-green-500 dark:border-green-600":
                severity === ALERT_SEVERITY.SUCCESS,
              "border-red-500 dark:border-red-600":
                severity === ALERT_SEVERITY.ERROR,
              "border-amber-500 dark:border-amber-600":
                severity === ALERT_SEVERITY.WARNING,
              "border-blue-500 dark:border-blue-600":
                severity === ALERT_SEVERITY.INFO,
            }
          )}
        >
          <div className="flex items-center gap-4">
            {severity === ALERT_SEVERITY.SUCCESS && (
              <SuccessIcon className="w-6 h-6 text-green-600" />
            )}
            {severity === ALERT_SEVERITY.ERROR && (
              <ErrorIcon className="w-6 h-6 text-red-600" />
            )}
            {severity === ALERT_SEVERITY.WARNING && (
              <WarningIcon className="w-6 h-6 text-amber-600" />
            )}
            {severity === ALERT_SEVERITY.INFO && (
              <InfoIcon className="w-6 h-6 text-blue-600" />
            )}

            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {message}
              </p>
            </div>

            <button
              className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
              onClick={handleClose}
            >
              <span className="sr-only">Dismiss popup</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </Transition.Child>
    </Transition>
  );
};

export default Alert;
