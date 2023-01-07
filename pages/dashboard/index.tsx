import { User } from "firebase/auth";
import React from "react";
import { Sidebar } from "../../components";
import { auth } from "../../utils/firebase";
type DashboardProps = {
  user: User;
};
const Dashboard = (context: DashboardProps) => {
  return (
    <main>
      <Sidebar />
    </main>
  );
};

export const getServerSideProps = () => {
  const user = auth.currentUser;
  // if (!user) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/login",
  //     },
  //     props: {},
  //   };
  // }
  return {
    props: {
      message: "hello",
      user: user,
    },
  };
};

export default Dashboard;
