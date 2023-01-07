import { PropsWithChildren } from "react";

interface LayoutProps extends Partial<PropsWithChildren> {
  page: string;
  loggedIn: boolean;
}
export default LayoutProps;
