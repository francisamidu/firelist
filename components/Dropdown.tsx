import React, { MouseEvent, MutableRefObject, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useClickOutside } from "../hooks";
import { DropdownProps } from "../types";

const Dropdown = ({ label, handler }: DropdownProps) => {
  const dropdownRef: MutableRefObject<any> = useRef();

  //Click handler functions
  const hide = () => {
    dropdownRef?.current.classList.add("hidden");
  };
  const show = () => {
    dropdownRef?.current.classList.remove("hidden");
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (dropdownRef?.current.classList.contains("hidden")) {
      show();
    } else {
      hide();
    }
  };
  const handleOptionClick = (
    event: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    const target: any = event.target;
    handler(target.dataset.value);
    hide();
  };
  useClickOutside(dropdownRef, hide);
  return (
    <div className="relative mx-0.5">
      <button
        id="dropdownDefault"
        className="bg-white text-blue-gray-600 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
        type="button"
        onClickCapture={(event) => handleClick(event)}
      >
        <span className="mr-1">{label}</span>
        <ChevronDown size={15} className="text-blue-gray-600" />
      </button>
      <div
        ref={dropdownRef}
        className="hidden absolute top-11 left-0 z-10 w-44 bg-white rounded-sm divide-y divide-gray-100 shadow transition-all duration-200"
      >
        <div>
          {label === "Sort" ? (
            <div className="flex flex-col">
              <span
                data-value="sort-date-asc"
                className="p-2 hover:cursor-pointer hover:bg-blue-gray-50 transition-all duration-200 text-blue-gray-600"
                onClick={(event) => handleOptionClick(event)}
              >
                Date (Asc)
              </span>
              <span
                data-value="sort-date-desc"
                className="p-2 hover:cursor-pointer hover:bg-blue-gray-50 transition-all duration-200 text-blue-gray-600"
                onClick={(event) => handleOptionClick(event)}
              >
                Date (Desc)
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span
                data-value="filter-completed"
                className="p-2 hover:cursor-pointer hover:bg-blue-gray-50 transition-all duration-200 text-blue-gray-600"
                onClick={(event) => handleOptionClick(event)}
              >
                Completed
              </span>
              <span
                data-value="filter-incomplete"
                className="p-2 hover:cursor-pointer hover:bg-blue-gray-50 transition-all duration-200 text-blue-gray-600"
                onClick={(event) => handleOptionClick(event)}
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
