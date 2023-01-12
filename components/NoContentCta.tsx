import React from "react";
import { BatteryLow } from "lucide-react";
import { Button } from ".";
import { NoContentCtaProps } from "../types";

const NoContentCta = ({ addTodo }: NoContentCtaProps) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-center p-3">
        <div className="w-max">
          <BatteryLow size={50} className="text-blue-gray-700 " />
        </div>
        <h1 className="font-bold text-sm text-center mt-3">#notodos</h1>
        <p className="blue-gray-600 text-center my-3">
          It appears you haven't created any todos
        </p>
        <Button text="Create a new todo" className="mt-2" onClick={addTodo} />
      </div>
    </div>
  );
};

export default NoContentCta;
