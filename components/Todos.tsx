import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Todo as ITodo } from "../types";
import { Dropdown, MakeTodo, Todo } from ".";

const Todos = () => {
  //State variables
  const [todos, setTodos] = useState<ITodo[]>([
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
  const [completed, setCompleted] = useState<ITodo[]>([]);
  const [todoStat, setTodoStat] = useState({
    todos: 0,
    completed: 0,
  });
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState<ITodo>({
    createdDate: new Date(),
    description: "",
    done: false,
    id: "",
    title: "",
  });

  //Refs
  const addBtnRef: MutableRefObject<any> = useRef();

  //Handlers
  const handleAddClick = () => setOpen(!open);
  const handleDropdownClick = (option: string) => {
    console.log(option);
  };
  const handleTodoClick = (id: string) => {
    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todos[todoIndex]) {
      setTodo(todos[todoIndex]);
      addBtnRef?.current.click();
    }
  };
  const handleResetTodo = () => {
    setTodo({
      createdDate: new Date(),
      description: "",
      done: false,
      id: "",
      title: "",
    });
  };
  useEffect(() => {
    setCompleted(todos.filter((t) => t.done === true));
    setTodoStat({
      todos: todos.length,
      completed: todos.filter((t) => t.done === true).length,
    });
  }, [todos]);
  return (
    <div className="px-3 max-h-[100vh] overflow-y-auto">
      <MakeTodo
        open={open}
        todo={todo}
        todos={todos}
        resetTodo={handleResetTodo}
        setOpen={setOpen}
        setTodos={setTodos}
      />
      <div className="flex flex-row items-center justify-between">
        <h1 className="my-2 font-bold text-blue-gray-800">Todos</h1>
        <div className="flex flex-row items-center">
          <Dropdown label="Sort" handler={handleDropdownClick} />
          <Dropdown label="Filter" handler={handleDropdownClick} />
        </div>
      </div>
      <div
        className="mt-5 flex flex-row items-center hover:cursor-pointer py-2 w-max"
        ref={addBtnRef}
        onClick={handleAddClick}
      >
        <Plus className="text-midnight-300 mr-3" size={18} />
        <span className="text-blue-gray-600">Add Todo</span>
      </div>
      <div>
        <div className="todos-container">
          <h2 className="my-4 font-bold text-blue-gray-800">
            Todos - {todoStat.todos}
          </h2>

          {todos
            .filter((t) => !t.done)
            .map((todo) => (
              <Todo
                todo={todo}
                key={todo.id}
                todos={todos}
                getTodo={handleTodoClick}
                setTodos={setTodos}
              />
            ))}
        </div>
        <div className="todos-container">
          <h2 className="my-4 font-bold text-blue-gray-800">
            Completed - {todoStat.completed}
          </h2>

          {completed.map((todo) => (
            <Todo
              todo={todo}
              key={todo.id}
              todos={todos}
              getTodo={handleTodoClick}
              setTodos={setTodos}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todos;
