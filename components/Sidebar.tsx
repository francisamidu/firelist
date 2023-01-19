import React, { useState } from "react";
import { Bookmark, ListPlus as Icon, User } from "lucide-react";
import { SidebarProps, Tab } from "../types";

const Sidebar = ({ setComponent }: SidebarProps) => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      active: true,
      text: "Todos",
    },
    {
      active: false,
      text: "Ideas",
    },
  ]);
  const handleClick = (text: string) => {
    setComponent(text.toLowerCase());
    const newTabs = tabs.map((tab) => {
      if (tab.text.toLowerCase() === text.toLowerCase()) {
        tab.active = true;
      } else {
        tab.active = false;
      }
      return tab;
    });
    setTabs(newTabs);
  };
  const renderIcon = (tab: Tab) => {
    switch (tab.text) {
      case "Todos": {
        return (
          <Icon
            size={18}
            className={`${
              tab.active ? "text-white  mr-3" : "text-blue-gray-600 mr-3"
            }`}
          />
        );
      }
      case "Ideas": {
        return (
          <Bookmark
            size={18}
            className={`${
              tab.active ? "text-white  mr-3" : "text-blue-gray-600 mr-3"
            }`}
          />
        );
      }
      default: {
        return null;
      }
    }
  };
  return (
    <div className="px-3">
      <h1 className="my-2 font-bold text-blue-gray-800">Menu</h1>
      {tabs.map((tab, index) => (
        <div
          className={`bg-white rounded py-2 px-3 md:w-[170px] flex flex-row items-center cursor-pointer transition-colors duration-300 mb-2 ${
            tab.active ? "bg-midnight-300 " : ""
          }`}
          key={index}
          onClick={() => handleClick(tab.text)}
        >
          {renderIcon(tab)}
          <span
            className={`${tab.active ? "text-white" : "text-blue-gray-600"}`}
          >
            {tab.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
