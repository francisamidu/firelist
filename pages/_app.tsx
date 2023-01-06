import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-tailwind/react";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { AuthProvider } from "../contexts/AuthContextProvider";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <AuthProvider>
      <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    </AuthProvider>
  );
};
export default App;
