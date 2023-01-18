import {
  addDoc,
  app,
  auth,
  collection,
  db,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "./firebase";
import {
  formatDate,
  formatDateVar,
  formatTime,
  formatTimeRelative,
} from "./format";
import generateRandomColor from "./generateRandomColor";
import { sendPasswordResetCode } from "./password-reset";
import { signin } from "./signin";
import { signup } from "./signup";

export {
  app,
  auth,
  addDoc,
  db,
  deleteDoc,
  doc,
  collection,
  generateRandomColor,
  getDoc,
  getDocs,
  formatDate,
  formatDateVar,
  formatTime,
  formatTimeRelative,
  sendPasswordResetCode,
  setDoc,
  signin,
  signup,
  updateDoc,
};
