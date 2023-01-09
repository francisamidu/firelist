import React, { Dispatch, SetStateAction } from "react";
import { Todo as ITodo } from "../types";
import { CheckCircle2, Calendar } from "lucide-react";
import { Checkbox } from "@material-tailwind/react";
import { formatDateVar } from "../utils";

type TodoProps = {
  todo: ITodo;
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
};
const Todo = ({
  todo: { done, id, title, description, createdDate },
  todos,
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
    <>
      {done ? (
        <div className="bg-white rounded-md my-1 p-5 flex flex-row items-start hover:cursor-pointer">
          <CheckCircle2
            className="hover:cursor-pointer text-midnight-300"
            onClick={() => handleClick()}
            checked
          />
          <div className="flex flex-col ml-3">
            <p className="flex flex-col">
              <span className="text-black line-through font-bold">{title}</span>
              <span className="text-blue-gray-500">{description}</span>
            </p>
            <div className="flex flex-row items-center mt-2">
              <Calendar size={16} className="text-blue-gray-500" />
              <span className="ml-2 text-sm text-blue-gray-500 font-bold">
                {formatDateVar(createdDate)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-md my-1 px-3 py-2 flex flex-row items-start hover:cursor-pointer">
          <Checkbox
            className="border-midnight-300 focus:ring-0 hover:right-0 !p-0 rounded-full border-2"
            onClick={() => handleClick()}
          />
          <div className="flex flex-col ml-3">
            <p className="flex flex-col">
              <span className="text-black font-bold">{title}</span>
              <span className="text-blue-gray-500">{description}</span>
            </p>
            <div className="flex flex-row items-center mt-2">
              <Calendar size={16} className="text-blue-gray-500" />
              <span className="ml-2 text-sm text-blue-gray-500 font-bold">
                {formatDateVar(createdDate)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
