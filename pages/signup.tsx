import React, { ReactNode } from "react";
import { Layout } from "../components";

const Signup = () => {
  return <main></main>;
};

Signup.getLayout = (page: ReactNode) => {
  return (
    <Layout page="Home" loggedIn={false}>
      {page}
    </Layout>
  );
};

export default Signup;
