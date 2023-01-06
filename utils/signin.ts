import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
export const signin = async (email: string, password: string) => {
  try {
    signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => userCredential.user
    );
  } catch (error) {
    throw error;
  }
};
