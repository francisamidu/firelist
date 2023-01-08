import React, { MutableRefObject, useRef } from "react";
import { ChevronDown, SortAsc, SortDesc } from "lucide-react";

type DropdownProps = {
  label: string;
  handler: () => void;
};
const Dropdown = ({ label, handler }: DropdownProps) => {
  const dropdownRef: MutableRefObject<any> = useRef();
  const handleClick = () => {
    dropdownRef?.current.classList.toggle("hidden");
  };
  return (
    <div className="relative mx-0.5">
      <button
        id="dropdownDefault"
        className="bg-white text-blue-gray-600 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={() => handleClick()}
      >
        <span className="mr-1">{label}</span>
        <ChevronDown size={15} className="text-blue-gray-600" />
      </button>
      <div
        ref={dropdownRef}
        className="hidden absolute top-10 left-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow transition-all duration-200"
      >
        <div>
          {label === "Sort" ? (
            <div className="flex flex-col">
              <span
                data-value="date-asc"
                className="p-2 hover:cursor-pointer hover:bg-blue-gray-50 transition-all duration-200 text-blue-gray-600"
              >
                Date (Asc)
              </span>
              <span
                data-value="date-desc"
                className="p-2 hover:cursor-pointer hover:bg-blue-gray-50 transition-all duration-200 text-blue-gray-600"
              >
                Date (Asc)
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span
                data-value="completed"
                className="p-2 hover:cursor-pointer hover:bg-blue-gray-50 transition-all duration-200 text-blue-gray-600"
              >
                Completed
              </span>
              <span
                data-value="incomplete"
                className="p-2 hover:cursor-pointer hover:bg-blue-gray-50 transition-all duration-200 text-blue-gray-600"
              >
                Incomplete
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
