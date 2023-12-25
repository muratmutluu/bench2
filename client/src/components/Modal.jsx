import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { GiSoccerBall } from 'react-icons/gi';
import { FaCalendarDays, FaTurkishLiraSign, FaRegClock, FaRegCircleXmark } from 'react-icons/fa6';
import { TbSoccerField } from 'react-icons/tb';

const Modal = ({ open, setOpen, timeSlot, day }) => {
  const [inputs, setInputs] = useState({});

  const handleClick = () => {
    setInputs({
      timeSlot: timeSlot,
      day: day,
      fieldId: 1,
    });
    setOpen(false);
  };
  console.log(inputs);
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-700 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-gray-800 dark:text-gray-50  text-center"
                  >
                    Rezervasyon Bilgileri
                  </Dialog.Title>
                  <div className="mt-3">
                    <div className="flex flex-col gap-5 p-2 bg-green-300 rounded-lg shadow-sm">
                      <div className="flex gap-1 items-center justify-center text-lg bg-gray-50 dark:bg-slate-700 p-3 rounded-lg border text-gray-800 dark:text-gray-50 dark:border-gray-600">
                        <GiSoccerBall size={24} />
                        <span className="text-2xl font-bold">Bench Cafe</span>
                      </div>
                      <div className="flex gap-1 items-center text-lg bg-gray-50 dark:bg-slate-700 p-2 rounded-lg border text-gray-800 dark:text-gray-50 dark:border-gray-600">
                        <TbSoccerField size={20} className="rotate-90" />
                        <span className="font-bold">Saha Adı: </span>
                        <span>Saha 1</span>
                      </div>
                      <div className="flex gap-1 items-center text-lg bg-gray-50 dark:bg-slate-700 p-2 rounded-lg border text-gray-800 dark:text-gray-50 dark:border-gray-600">
                        <FaCalendarDays size={20} />
                        <span className="font-bold">Rezervasyon Tarihi: </span>
                        <span>{day}</span>
                      </div>
                      <div className="flex gap-1 items-center text-lg bg-gray-50 dark:bg-slate-700 p-2 rounded-lg border text-gray-800 dark:text-gray-50 dark:border-gray-600">
                        <FaRegClock size={20} />
                        <span className="font-bold">Rezervasyon Saati: </span>
                        <span>{timeSlot.slot}</span>
                      </div>
                      <div className="flex gap-1 items-center text-lg bg-gray-50 dark:bg-slate-700 p-2 rounded-lg border text-gray-800 dark:text-gray-50 dark:border-gray-600">
                        <FaTurkishLiraSign size={20} />
                        <span className="font-bold">Rezervasyon Tutarı: </span>
                        <span>960 TL</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleClick}
                    >
                      Kirala ve Öde
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      <FaRegCircleXmark size={20} />
                    </button>
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
