import React, { Dispatch, SetStateAction } from "react";
import { Todo as ITodo } from "../types";
import { CheckSquare, CheckSquareIcon } from "lucide-react";
import { Checkbox } from "@material-tailwind/react";

type TodoProps = {
  todo: ITodo;
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
};
const Todo = ({ todo: { done, id, title }, todos, setTodos }: TodoProps) => {
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
        <div className="bg-white rounded-md my-1 p-5 flex flex-row items-center">
          <CheckSquare
            className="hover:cursor-pointer text-midnight-300"
            onClick={() => handleClick()}
            checked
          />
          <span className="text-blue-gray-600 ml-3 line-through">{title}</span>
        </div>
      ) : (
        <div className="bg-white rounded-md my-1 px-3 py-2 flex flex-row items-center">
          <Checkbox
            className="text-midnight-300 focus:ring-0 hover:right-0 !p-0"
            onClick={() => handleClick()}
          />
          <span className="text-blue-gray-600 ml-3">{title}</span>
        </div>
      )}
    </>
  );
};

export default Todo;
