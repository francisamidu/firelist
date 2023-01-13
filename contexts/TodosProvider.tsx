import { ref, onValue } from "firebase/database";
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
import { collection, db, getDocs } from "../utils";

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

  const getTodos = async () => {
    try {
      const snapshot = await getDocs(collection(db, "todos"));
      snapshot.forEach((doc) => {
        const todo: any = {
          id: doc.id,
          ...doc.data(),
          createdDate: new Date(doc.data()?.createdDate?.seconds * 1000),
        };
        setTodoList([...todoList, todo]);
        console.log(todo);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

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
