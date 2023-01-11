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

const MakeTodo = ({ open, setOpen, setTodos, todo, todos }: DialogProps) => {
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
  const handleOpen = () => {
    const notFilled = Object.values(todoItem).some((el) => el === "");
    if (!notFilled) {
      setError("Please fill all required fiels");
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      setOpen(!open);
      handleSubmit();
    }
  };
  const handleClick = () => {
    setOpen(false);
  };
  useClickOutside(dialogRef, handleClick);

  useEffect(() => {
    if (todo) setTodoItem(todo);
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
            className="text-blue-gray-700 mb-2 border-b border-[1px] border-blue-gray-50 focus:!border-blue-gray-50 focus:outline-none"
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
            className="text-blue-gray-700 mt-2 border-b border-[1px] border-blue-gray-50 focus:border-blue-gray-50 focus:outline-none"
            onChange={(event) =>
              setTodoItem({
                ...todoItem,
                description: event.target.value,
              })
            }
            placeholder="Task Description"
            value={todoItem.description}
          />
        </DialogBody>
        <DialogFooter className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center py-1 px-3 rounded-xl border-[1px] border-blue-gray-50">
            <Calendar className="text-blue-gray-300" size={16} />
            <span className="text-md font-bold ml-2 text-blue-gray-300">
              Due Date
            </span>
          </div>
          <div className="flex flex-row items-center">
            <Button
              className="!bg-white !ring-0 !shadow-none !border-[1px] !border-blue-gray-50 mr-2 !text-blue-gray-700"
              onClick={handleOpen}
              text="Cancel"
            />
            <Button className="" onClick={handleOpen} text="Confirm" />
          </div>
          {error ? (
            <div>
              <span className="text-burgundy-500">{error}</span>
            </div>
          ) : null}
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default MakeTodo;
