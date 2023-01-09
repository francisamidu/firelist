import { app, auth, db } from "./firebase";
import {
  formatDate,
  formatDateVar,
  formatTime,
  formatTimeRelative,
} from "./format";
import { sendPasswordResetCode } from "./password-reset";
import { signin } from "./signin";
import { signup } from "./signup";

export {
  app,
  auth,
  db,
  formatDate,
  formatDateVar,
  formatTime,
  formatTimeRelative,
  sendPasswordResetCode,
  signin,
  signup,
};
