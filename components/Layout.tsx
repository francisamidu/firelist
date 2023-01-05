import Head from "next/head";
import React, { PropsWithChildren } from "react";
import { Footer, Navbar } from ".";
import shared from "../shared.json";
const { name, description } = shared;

interface LayoutProps extends Partial<PropsWithChildren> {
  page: string;
}
const Layout = ({ children, page }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>
          {page} - {name}
        </title>
        <meta name="title" content={`${page} | ${name}`}></meta>
        <meta name="description" content={description}></meta>
      </Head>
      <main className="flex flex-col justify-between min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
