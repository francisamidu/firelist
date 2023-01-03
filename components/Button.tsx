import React from "react";
import { Button as IButton } from "@material-tailwind/react";

type ButtonProps = {
  text: string;
};
const Button = ({ text }: ButtonProps) => {
  return (
    <IButton color="blue-gray" variant="outlined">
      {text}
    </IButton>
  );
};

export default Button;
