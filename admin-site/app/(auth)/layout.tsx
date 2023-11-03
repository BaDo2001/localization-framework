import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <main className="h-full flex justify-center items-center">{children}</main>
);

export default Layout;
