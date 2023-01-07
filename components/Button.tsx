import React from "react";
import { Button as IButton } from "@material-tailwind/react";
import { ButtonProps } from "../types";

const Button = ({ className, text, onClick }: ButtonProps) => {
  const handleClick = typeof onClick === "function" ? onClick : () => {};
  const classes = className
    ? `${className} bg-midnight-300 shadow-none`
    : "bg-midnight-300 shadow-none";
  return (
    <IButton className={classes} variant="filled" onClick={handleClick}>
      {text}
    </IButton>
  );
};

export default Button;
