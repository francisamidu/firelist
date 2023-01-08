import React from "react";
import { Plus } from "lucide-react";

const Todos = () => {
  return (
    <div className="px-3">
      <h1 className="my-2 font-bold text-blue-gray-800">Todos</h1>
      <div className="mt-5 flex flex-row items-center hover:cursor-pointer p-2">
        <Plus className="text-midnight-300 mr-3" size={18} />
        <span className="text-blue-gray-600">Add Todo</span>
      </div>
    </div>
  );
};

export default Todos;
