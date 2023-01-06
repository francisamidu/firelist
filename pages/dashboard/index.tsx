import { getAuth, User } from "firebase/auth";
import React, { ReactNode } from "react";
import { Layout } from "../../components";
import { auth } from "../../utils/firebase";
type DashboardProps = {
  user: User;
};
const Dashboard = (context: DashboardProps) => {
  console.log(context);
  return <main></main>;
};

export const getServerSideProps = () => {
  const user = auth.currentUser;
  return {
    props: {
      message: "hello",
      user: user,
    },
  };
};
Dashboard.getLayout = (page: ReactNode) => {
  return (
    <Layout page="Dashboard" loggedIn={false}>
      {page}
    </Layout>
  );
};

export default Dashboard;
