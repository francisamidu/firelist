import React, { MutableRefObject, useRef } from "react";
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
import { DialogProps } from "../types";

const MakeTodo = ({ open, setOpen, todo }: DialogProps) => {
  const dialogRef: MutableRefObject<any> = useRef();
  const handleOpen = () => setOpen(!open);
  const handleClick = () => {
    setOpen(false);
  };
  useClickOutside(dialogRef, handleClick);

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
            className="text-blue-gray-700 mb-2 border-b border-[1px] border-blue-gray-50 focus:border-blue-gray-50 focus:outline-none"
            placeholder="Task title here...."
          />
          <Textarea
            className="text-blue-gray-700 mt-2 border-b border-[1px] border-blue-gray-50 focus:border-blue-gray-50 focus:outline-none"
            placeholder="Task Description"
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
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default MakeTodo;
