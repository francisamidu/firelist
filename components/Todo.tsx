import React, { Dispatch, SetStateAction } from "react";
import { Todo as ITodo } from "../types";
import { CheckCircle } from "lucide-react";

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
        <div className="bg-white rounded my-1 p-2 flex flex-row items-center">
          <CheckCircle
            className="text-midnight-300 transition-all duration-300"
            onClick={() => handleClick()}
            checked
          />
          <span className="ml-3 line-through">{title}</span>
        </div>
      ) : (
        <div className="bg-white rounded my-1 p-2 flex flex-row items-center">
          <CheckCircle
            className="text-midnight-300 transition-all duration-300"
            onClick={() => handleClick()}
          />
          <span className="ml-3">{title}</span>
        </div>
      )}
    </>
  );
};

export default Todo;
