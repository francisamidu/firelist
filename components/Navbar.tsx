import React from "react";
import { Navbar } from "@material-tailwind/react";
import Link from "next/link";
import shared from "../shared.json";
import Button from "./Button";

const Nav = () => {
  return (
    <Navbar className="py-3 border-b border-b-gray-100" blurred>
      <div className="md:max-w-screen-lg md:mx-auto flex flex-row items-center justify-between">
        <Link href="/">
          <span>{shared.name}</span>
        </Link>
        <Button text="Login" />
      </div>
    </Navbar>
  );
};

export default Nav;
