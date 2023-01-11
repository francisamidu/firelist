import "../styles/globals.css";
import "@fontsource/inter";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-tailwind/react";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { TodosProvider } from "../contexts/TodosProvider";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <ThemeProvider>
      <TodosProvider>{getLayout(<Component {...pageProps} />)}</TodosProvider>
    </ThemeProvider>
  );
};
export default App;
