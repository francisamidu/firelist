import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  Alert,
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
import { collection, db, doc, setDoc, updateDoc } from "../utils";

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
    id: Date.now().toString(),
    title: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const todosRef = collection(db, "todos");
      if (todo?.title) {
        await updateDoc(doc(db, "todos", todo.id), {
          ...todoItem,
          done: todo.done,
        });
        const newTodos = todos.map((t) => {
          if (t.id === todo.id) {
            t = {
              ...todoItem,
              done: todo.done,
            };
          }
          return t;
        });
        setTodos(newTodos);
      } else {
        if (todo?.description || todo?.title) {
          await setDoc(doc(todosRef), todoItem);
          const tempTodos = [todoItem, ...todos];
          setTodos(tempTodos);
        }
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occured";
      setError(message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
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
    const notFilled = !todoItem.title || !todoItem.description;

    if (notFilled) {
      setError("Please fill all required fiels");
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      handleSubmit();
      handleClick();
    }
  };
  useClickOutside(dialogRef, handleClick);

  useEffect(() => {
    if (todo) setTodoItem({ ...todo });
  }, [todo]);

  return (
    <>
      {error ? (
        <Alert color="red" className="text-center">
          <span>{error}</span>
        </Alert>
      ) : null}
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
              text={todo?.title || todo?.description ? "Update" : "Create"}
            />
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default MakeTodo;
