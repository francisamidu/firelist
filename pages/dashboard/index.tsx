import { User } from "firebase/auth";
import Head from "next/head";
import React, { useState } from "react";
import { Content, Sidepanel, Sidebar } from "../../components";
import { auth } from "../../utils/firebase";
type DashboardProps = {
  user: User;
};
const Dashboard = (context: DashboardProps) => {
  const [component, setComponent] = useState("todos");
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="dashboard-container bg-blue-gray-50 h-full min-h-[98vh] pt-5">
        <Sidebar setComponent={setComponent} />
        <Content name={component} />
        <Sidepanel />
      </main>
    </>
  );
};

// export const getServerSideProps = () => {
//   const user = auth.currentUser;
//   if (!user) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//       props: {},
//     };
//   }
// };

export default Dashboard;
