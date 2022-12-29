import { createPortal } from 'react-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

type Props = {
  open: boolean;
  close: () => void;
  confirm: () => void;
  title: string;
  message: string | ReactNode;
};

const ConfirmModal = ({ open, close, confirm, title, message }: Props) =>
  open
    ? createPortal(
        <>
          <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={close}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-box bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-secondary font-noto-sans"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        {message instanceof String ? (
                          <p className="text-sm text-gray-500">{message}</p>
                        ) : (
                          message
                        )}
                      </div>

                      <div className="mt-4 space-x-4">
                        <button
                          type="button"
                          className="btn btn-base btn-sm"
                          onClick={close}
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          className="btn btn-error btn-sm"
                          onClick={confirm}
                        >
                          Excluir
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>,
        document.body,
      )
    : null;

export default ConfirmModal;
