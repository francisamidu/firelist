import nookies from "nookies";
import { Auth, getAuth, User } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../utils/firebase";

const AuthContext = createContext<User | null>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
