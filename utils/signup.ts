import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from ".";

export const signup = async (email: string, password: string) => {
  try {
    createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        const user = auth.currentUser || userCredential.user;
        await sendEmailVerification(user);
        return userCredential.user;
      }
    );
  } catch (error) {
    throw error;
  }
};
