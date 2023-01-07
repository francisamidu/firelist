import { app, auth, db } from "./firebase";
import { formatDate, formatTime, formatTimeRelative } from "./format";
import getIpData from "./getIpData";
import { sendPasswordResetCode } from "./password-reset";
import { signin } from "./signin";
import { signup } from "./signup";

export {
  app,
  auth,
  db,
  formatDate,
  formatTime,
  formatTimeRelative,
  getIpData,
  sendPasswordResetCode,
  signin,
  signup,
};
