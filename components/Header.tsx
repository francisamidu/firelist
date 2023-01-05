import React from "react";
import shared from "../shared.json";

const Header = () => {
  return (
    <header className="p-4 min-h-[96vh] flex flex-col justify-center">
      <div className="md:w-4/5 md:mx-auto text-center">
        <h1 className="uppercase font-bold text-xs text-blue-gray-700">
          Welcome to {shared.name}
        </h1>
        <h2 className="text-6xl mt-2 font-bold">
          Your favorite
          <span className="text-midnight-300 mx-2">Todolist</span>
          App
        </h2>
        <p className="my-2 text-blue-gray-700">
          A lightweight todolist app for keeping track of your tasks
        </p>
      </div>
    </header>
  );
};

export default Header;
