import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const auth = getAuth();
export const signup = async (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      await sendEmailVerification(userCredential.user);
      return userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(errorMessage, {
        cause: errorCode,
      });
    });
};
