import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";

export const sendPasswordResetCode = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};
