import React from "react";
import { TodoProps } from "../types";
import { CheckCircle2, Calendar, Trash } from "lucide-react";
import { Checkbox } from "@material-tailwind/react";
import { formatDateVar } from "../utils";

const Todo = ({
  todo: { done, id, title, description, createdDate },
  todos,
  getTodo,
  removeTodo,
  setTodos,
}: TodoProps) => {
  const handleClick = () => {
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        t.done = !t.done;
      }
      return t;
    });
    setTodos(newTodos);
  };
  return (
    <div>
      {done ? (
        <div className="bg-white rounded-md my-1 p-5 flex flex-row items-start relative">
          <CheckCircle2
            className="hover:cursor-pointer text-midnight-300"
            onClick={() => handleClick()}
            checked
          />
          <div className="flex flex-col ml-3">
            <p className="flex flex-col" onClick={() => getTodo(id)}>
              <span className="text-black line-through font-bold hover:cursor-pointer">
                {title}
              </span>
              <span className="text-blue-gray-500">{description}</span>
            </p>
            <div className="flex flex-row items-center mt-2">
              <Calendar size={16} className="text-blue-gray-500" />
              <span className="ml-2 text-sm text-blue-gray-500 font-bold">
                {formatDateVar(createdDate)}
              </span>
            </div>
          </div>
          <div
            className="hover:cursor-pointer absolute top-2 right-3 p-2 rounded-md border-[1px] border-blue-gray-50"
            onClick={() => removeTodo(id)}
          >
            <Trash className="text-blue-gray-500" size={17} />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-md my-1 px-3 py-2 flex flex-row items-start relative">
          <Checkbox
            className="border-midnight-300 focus:ring-0 hover:right-0 !p-0 rounded-full border-2"
            onClick={() => handleClick()}
          />
          <div className="flex flex-col ml-3">
            <p className="flex flex-col" onClick={() => getTodo(id)}>
              <span className="text-black font-bold hover:cursor-pointer">
                {title}
              </span>
              <span className="text-blue-gray-500">{description}</span>
            </p>
            <div className="flex flex-row items-center mt-2">
              <Calendar size={16} className="text-blue-gray-500" />
              <span className="ml-2 text-sm text-blue-gray-500 font-bold">
                {formatDateVar(createdDate)}
              </span>
            </div>
          </div>
          <div
            className="hover:cursor-pointer absolute top-2 right-3 p-2 rounded-md border-[1px] border-blue-gray-50"
            onClick={() => removeTodo(id)}
          >
            <Trash className="text-blue-gray-500" size={17} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
