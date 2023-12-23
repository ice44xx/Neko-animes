import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default DefaultLayout;
