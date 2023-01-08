import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Todo as ITodo } from "../types";
import { Dropdown, Todo } from ".";

const Todos = () => {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: "1",
      title: "Finish this project",
      done: false,
    },
    {
      id: "2",
      title: "Finish Ytb Downloader project",
      done: false,
    },
    {
      id: "7",
      title: "Finish MealAssistant project",
      done: false,
    },
    {
      id: "8",
      title: "Finish Task project",
      done: false,
    },
    {
      id: "9",
      title: "Learn Svelte for real",
      done: false,
    },
    {
      id: "4",
      title: "Revamp your portfolio",
      done: true,
    },
    {
      id: "5",
      title: "Create a twitter account",
      done: true,
    },
    {
      id: "6",
      title: "Reach 10 commits in the first 8 days of 2023",
      done: true,
    },
  ]);
  const [completed, setCompleted] = useState<ITodo[]>([]);
  const [todoStat, setTodoStat] = useState({
    todos: todos.length,
    completed: todos.filter((t) => t.done === true).length,
  });

  const handleDropdownClick = () => {};
  useEffect(() => {
    setCompleted(todos.filter((t) => t.done === true));
  }, [todos]);
  return (
    <div className="px-3 max-h-[100vh] overflow-y-auto">
      <div className="flex flex-row items-center justify-between">
        <h1 className="my-2 font-bold text-blue-gray-800">Todos</h1>
        <div className="flex flex-row items-center">
          <Dropdown label="Sort" handler={handleDropdownClick} />
          <Dropdown label="Filter" handler={handleDropdownClick} />
        </div>
      </div>
      <div className="mt-5 flex flex-row items-center hover:cursor-pointer p-2">
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
                setTodos={setTodos}
              />
            ))}
        </div>
        <div className="todos-container">
          <h2 className="my-4 font-bold text-blue-gray-800">
            Completed - {todoStat.completed}
          </h2>

          {completed.map((todo) => (
            <Todo todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todos;
