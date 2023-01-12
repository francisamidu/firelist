import { ref, onValue } from "../utils";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  ReactNode,
} from "react";
import { Todo } from "../types";
import { db } from "../utils";

const TodosContext = createContext<{
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}>({
  todos: [],
  setTodos: () => {},
});

export const TodosProvider = ({
  children,
}: Partial<PropsWithChildren<ReactNode>>) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    const todoRef = ref(db, "/todos");

    onValue(todoRef, (snapshot) => {
      const todos = snapshot.val();
      const newTodoList: Todo[] = [];
      for (let id in todos) {
        newTodoList.push({ id, ...todos[id] });
      }
      setTodoList(newTodoList);
    });
  }, [db]);

  return (
    <TodosContext.Provider
      value={{
        setTodos: setTodoList,
        todos: todoList,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
