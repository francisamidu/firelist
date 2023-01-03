import React from "react";
import { Button as IButton } from "@material-tailwind/react";

type ButtonProps = {
  text: string;
};
const Button = ({ text }: ButtonProps) => {
  return (
    <IButton className="bg-midnight-300 shadow-none" variant="filled">
      {text}
    </IButton>
  );
};

export default Button;
