import React, { ReactNode, useState } from "react";
import { Button, Layout } from "../components";
import shared from "../shared.json";
import Link from "next/link";
import { Alert } from "@material-tailwind/react";
import { signup } from "../utils";
import { Status } from "../types";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    repPassword: "",
  });
  const [status, setStatus] = useState<Status>({
    status: "success",
    message: "",
  });
  const handleSubmit = async () => {
    const set = Object.values(user).every((el) => el !== "");
    if (!set) {
      return;
    }
    signup(user.email, user.password)
      .then(() => {
        setStatus({
          status: "success",
          message: `Sent email verification to ${user.email}`,
        });
        setTimeout(() => {
          router.push("/signin");
        }, 5000);
      })
      .catch((error) => {
        setStatus({
          status: "failed",
          message: error.message,
        });
      });
  };
  return (
    <section className="bg-gray-50">
      <div className="mt-8 w-2/5">
        <Alert
          show={status.message !== ""}
          color={status.status === "failed" ? "red" : "green"}
        >
          {status.message}
        </Alert>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-blue-gray-600 text-center">
              Signup up for a {shared.name} account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-bold text-blue-gray-600">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      email: event.target.value,
                    })
                  }
                  id="email"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg block w-full p-2.5  
                        "
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-blue-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      password: event.target.value,
                    })
                  }
                  placeholder="????????????????????????"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg block w-full p-2.5 outline-none  
                        "
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-blue-gray-600">
                  Repeat Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={user.repPassword}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      repPassword: event.target.value,
                    })
                  }
                  placeholder="????????????????????????"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg block w-full p-2.5 outline-none  
                        "
                />
              </div>
              <Button
                text="Signup"
                className="w-full !mt-1"
                onClick={() => handleSubmit()}
              />
              <div className="text-sm font-light text-blue-gray-700 dark:text-gray-400 flex flex-row items-center">
                <span>Have an account already?</span>
                <Link
                  href="/signin"
                  className="bg-white text-blue-gray-500 ml-2 shadow-none border-none hover:shadow-none hover:text-midnight-300 !capitalize !p-0"
                >
                  Signin
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

Signup.getLayout = (page: ReactNode) => {
  return (
    <Layout page="Signup" loggedIn={false}>
      {page}
    </Layout>
  );
};

export default Signup;
