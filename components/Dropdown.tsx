import React, { MouseEvent, MutableRefObject, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useClickOutside } from "../hooks";
import { DropdownProps } from "../types";

const Dropdown = ({ label, handler }: DropdownProps) => {
  const dropdownRef: MutableRefObject<any> = useRef();

  //State variables
  const [filterOptions, setFilterOptions] = useState([
    {
      name: "All",
      value: "filter-all",
    },
    {
      name: "Complete",
      value: "filter-completed",
    },
    {
      name: "Incomplete",
      value: "filter-incomplete",
    },
  ]);
  const [sortOptions, setSortOptions] = useState([
    {
      name: "Date (All)",
      value: "sort-date-all",
    },
    {
      name: "Date (Asc)",
      value: "sort-date-asc",
    },
    {
      name: "Date (Desc)",
      value: "sort-date-desc",
    },
  ]);

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
              {sortOptions.map(({ name, value }, index) => (
                <span
                  data-value={value}
                  key={index}
                  className="p-2 hover:cursor-pointer hover:bg-blue-gray-50 transition-all duration-200 text-blue-gray-600"
                  onClick={(event) => handleOptionClick(event)}
                >
                  {name}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {filterOptions.map(({ name, value }, index) => (
                <span
                  data-value={value}
                  key={index}
                  className="p-2 hover:cursor-pointer hover:bg-blue-gray-50 transition-all duration-200 text-blue-gray-600"
                  onClick={(event) => handleOptionClick(event)}
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
