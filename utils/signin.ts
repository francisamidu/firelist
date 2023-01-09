import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const signin = async (email: string, password: string) => {
  try {
    signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => userCredential.user
    );
  } catch (error) {
    throw error;
  }
};
