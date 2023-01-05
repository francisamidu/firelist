import React from "react";
import { Navbar } from "@material-tailwind/react";
import Link from "next/link";
import shared from "../shared.json";
import Button from "./Button";

const Nav = () => {
  return (
    <Navbar
      className="py-2 border-b border-b-gray-100 rounded-none fixed top-0 left-0 z-10"
      blurred
      fullWidth
    >
      <div className="md:max-w-screen-lg md:mx-auto flex flex-row items-center justify-between">
        <Link
          href="/"
          className="text-midnight-300 uppercase text-sm font-bold"
        >
          {shared.name}
        </Link>
        <Button text="Login" />
      </div>
    </Navbar>
  );
};

export default Nav;
