import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { Calendar } from "lucide-react";
import { Button } from ".";
import { useClickOutside } from "../hooks";
import { DialogProps, Todo } from "../types";

const MakeTodo = ({
  open,
  setOpen,
  setTodos,
  resetTodo,
  todo,
  todos,
}: DialogProps) => {
  const dialogRef: MutableRefObject<any> = useRef();
  const [todoItem, setTodoItem] = useState<Todo>({
    createdDate: new Date(),
    description: "",
    done: false,
    id: "",
    title: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (todo) {
      const newTodos = todos.map((t) => {
        if (t.id === todo.id) {
          t = {
            ...todoItem,
          };
        }
        return t;
      });
      setTodos(newTodos);
      return;
    }
    const tempTodos = [...todos, todoItem];
    setTodos(tempTodos);
  };
  const resetTodoItem = () => {
    setTodoItem({
      createdDate: new Date(),
      description: "",
      done: false,
      id: "",
      title: "",
    });
  };
  const handleClick = () => {
    setOpen(false);
    resetTodoItem();
    resetTodo();
  };
  const handleOpen = () => {
    setTodoItem({
      ...todoItem,
      id: Date.now().toString(),
    });
    const notFilled = !todoItem.title || !todoItem.description;

    if (notFilled) {
      setError("Please fill all required fiels");
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      handleClick();
      handleSubmit();
    }
  };
  useClickOutside(dialogRef, handleClick);

  useEffect(() => {
    if (todo) setTodoItem({ ...todo });
  }, [todo]);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        ref={dialogRef}
        className="p-2 rounded-md"
      >
        <p className="text-center !w-full py-2 text-2xl font-bold">
          {!todo ? "Create a new task" : `Editing task #${todo.id}`}
        </p>
        <DialogBody>
          <Input
            className="text-blue-gray-700 mb-2.5 placeholder-show:!border-none !border-[1px] !border-blue-gray-50 focus:!border-blue-gray-50 focus:outline-none"
            onChange={(event) =>
              setTodoItem({
                ...todoItem,
                title: event.target.value,
              })
            }
            placeholder="Task title here...."
            value={todoItem.title}
          />
          <Textarea
            className="text-blue-gray-700 mt-2.5 !border-[1px] !border-blue-gray-50 focus:border-blue-gray-50 focus:outline-none placeholder-show:!border-none"
            onChange={(event) =>
              setTodoItem({
                ...todoItem,
                description: event.target.value,
              })
            }
            placeholder="Task Description"
            value={todoItem.description}
          />
          {error ? (
            <div className="my-2">
              <span className="text-burgundy-500">{error}</span>
            </div>
          ) : null}
        </DialogBody>
        <DialogFooter className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center py-2 px-3 rounded-xl border-[1px] border-blue-gray-50 hover:cursor-pointer">
            <Calendar className="text-blue-gray-300" size={16} />
            <span className="text-sm font-medium ml-2 text-blue-gray-300">
              Due Date
            </span>
          </div>
          <div className="flex flex-row items-center">
            <Button
              className="!bg-white !ring-0 hover:!shadow-none !border-[1px] !border-blue-gray-50 mr-2 !text-blue-gray-700 py-2.5 hover:!bg-blue-gray-700 hover:!text-white transition-all duration-300"
              onClick={handleClick}
              text="Cancel"
            />
            <Button
              className="py-2.5 hover:!shadow-none border-[1px] border-midnight-500 hover:!text-midnight-500 hover:!bg-white"
              onClick={handleOpen}
              text={todo ? "Update" : "Create"}
            />
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default MakeTodo;
