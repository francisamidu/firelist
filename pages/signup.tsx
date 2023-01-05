import React, { ReactNode } from "react";
import { Button, Layout } from "../components";
import { Button as MButton } from "@material-tailwind/react";
import shared from "../shared.json";

const Signup = () => {
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-blue-gray-600 text-center">
              Login to {shared.name}
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-blue-gray-600">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  
                        "
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-blue-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  
                        "
                />
              </div>

              <MButton className="bg-white text-blue-gray-500 mr-2 shadow-none border-none hover:shadow-none hover:text-midnight-300 px-1 !mt-2">
                Forgot Password?
              </MButton>
              <Button text="Signin" className="w-full !mt-1" />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don{`’`}t have an account yet?{" "}
                <MButton className="bg-white text-blue-gray-500 mr-2 shadow-none border-none hover:shadow-none hover:text-midnight-300">
                  Signup
                </MButton>
              </p>
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
