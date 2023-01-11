import { Dispatch, SetStateAction } from "react";
import Todo from "./Todo";

type DialogProps = {
  todo?: Todo;
  open: boolean;
  todos: Todo[];
  resetTodo: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};
export default DialogProps;
