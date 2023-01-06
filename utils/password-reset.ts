import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();
export const sendPasswordResetCode = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};
