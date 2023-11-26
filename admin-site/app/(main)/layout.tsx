import type { FC, PropsWithChildren } from "react";

import Navbar from "./navbar";

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <main className="flex h-full items-stretch">
    <Navbar />

    <div className="flex-1 flex flex-col h-full px-12 py-8 overflow-y-auto">
      {children}
    </div>
  </main>
);

export default Layout;
