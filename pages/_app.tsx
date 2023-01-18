import "../styles/globals.css";
import "@fontsource/inter";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-tailwind/react";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { IdeasProvider, TodosProvider } from "../contexts";

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
      <TodosProvider>
        <IdeasProvider>{getLayout(<Component {...pageProps} />)}</IdeasProvider>
      </TodosProvider>
    </ThemeProvider>
  );
};
export default App;
