import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Todo as ITodo } from "../types";
import { Dropdown, MakeTodo, Todo } from ".";
import { useTodos } from "../contexts/TodosProvider";

const Todos = () => {
  const { setTodos, todos } = useTodos();

  //State variables
  const [todoItems, setTodoItems] = useState<ITodo[]>([]);
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
    switch (option) {
      case "filter-completed": {
        let temp1 = todos.filter((t) => t.done === true);
        setTodoItems(temp1);
        break;
      }
      case "filter-incomplete": {
        let temp1 = todos.filter((t) => t.done !== true);
        setTodoItems(temp1);
        break;
      }
      case "sort-date-asc": {
      }
      case "sort-date-desc": {
      }
      default: {
        break;
      }
    }
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
    setTodoItems(todos);
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
        todos={todoItems}
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

          {todoItems
            .filter((t) => !t.done)
            .map((todo) => (
              <Todo
                todo={todo}
                key={todo.id}
                todos={todoItems}
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
              todos={todoItems}
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
