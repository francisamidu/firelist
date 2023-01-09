import { Dispatch, SetStateAction } from "react";
import Todo from "./Todo";

type DialogProps = {
  todo?: Todo;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export default DialogProps;
