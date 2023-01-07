import React, { useState } from "react";
import { ToggleRight, User } from "lucide-react";

const Sidebar = () => {
  const [tabs, setTabs] = useState([
    {
      icon: <ToggleRight size={18} className="text-blue-gray-600 mr-2" />,
      text: "Todos",
    },
    {
      icon: <User size={18} className="text-blue-gray-600 mr-2" />,
      text: "Profile",
    },
  ]);
  return (
    <div className="px-3">
      {tabs.map((tab, index) => (
        <div
          className="bg-white rounded p-2 flex flex-row items-center justify-between"
          key={index}
        >
          {tab.icon}
          <span className="text-blue-gray-600">{tab.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
