import { Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ThemeContext } from "../../redux/ThemeContext";

const ScoreModal = ({ isOpen, onClose, criteria }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
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
              className={`inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform  shadow-xl rounded-lg
                ${
                  theme === "light" ? "bg-white " : "bg-[#181818] text-gray-300"
                }
              `}
            >
              <Dialog.Title
                as="h3"
                className="text-lg sm:text-xl font-bold justify-between  flex gap-2   items-center"
              >
                Criteria Summary
              </Dialog.Title>

              <div className="mt-4">
                <ul className="flex flex-col gap-2 list-disc p-3 ">
                  {Object.keys(criteria).map((key) => (
                    <li key={key}>
                      <strong className="text-sm  md:text-base lg:text-lg font-bold">
                        {criteria[key].name}:
                      </strong>{" "}
                      <span className="text-xs  md:text-sm lg:text-base">
                        {criteria[key].description}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="inline-flex w-full justify-center p-2  text-sm font-bold text-white bg-red-500 outline-none  mt-2 rounded-md hover:bg-red-600  "
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ScoreModal;
