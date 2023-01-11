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
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      done: false,
      description:
        "Esse eius voluptatum accusamus illo veniam odit nulla quo earum dolorem nemo.",
      title: "Finish this project",
      createdDate: new Date(),
    },
    {
      id: "2",
      done: false,
      description:
        "Esse eius voluptatum accusamus illo veniam odit nulla quo earum dolorem nemo.",
      title: "Finish Ytb Downloader project",
      createdDate: new Date(),
    },
    {
      id: "7",
      description:
        "Esse eius voluptatum accusamus illo veniam odit nulla quo earum dolorem nemo.",
      done: false,
      title: "Finish MealAssistant project",
      createdDate: new Date(),
    },
    {
      id: "8",
      description:
        "Esse eius voluptatum accusamus illo veniam odit nulla quo earum dolorem nemo.",
      done: false,
      title: "Finish Task project",
      createdDate: new Date(),
    },
    {
      id: "9",
      description:
        "Esse eius voluptatum accusamus illo veniam odit nulla quo earum dolorem nemo.",
      done: false,
      title: "Learn Svelte for real",
      createdDate: new Date(),
    },
    {
      id: "4",
      description:
        "Esse eius voluptatum accusamus illo veniam odit nulla quo earum dolorem nemo.",
      done: true,
      title: "Revamp your portfolio",
      createdDate: new Date(),
    },
    {
      id: "5",
      description:
        "Esse eius voluptatum accusamus illo veniam odit nulla quo earum dolorem nemo.",
      done: true,
      title: "Create a twitter account",
      createdDate: new Date(),
    },
    {
      id: "6",
      description:
        "Esse eius voluptatum accusamus illo veniam odit nulla quo earum dolorem nemo.",
      done: true,
      title: "Reach 10 commits in the first 8 days of 2023",
      createdDate: new Date(),
    },
  ]);

  return (
    <TodosContext.Provider
      value={{
        setTodos,
        todos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
