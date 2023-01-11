import { Dispatch, SetStateAction } from "react";
import { Todo } from ".";

type TodoProps = {
  todo: Todo;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  getTodo: (id: string) => void;
};
export default TodoProps;
