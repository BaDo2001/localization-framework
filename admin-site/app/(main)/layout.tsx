import type { FC, PropsWithChildren } from "react";

import Navbar from "./Navbar";

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <main className="flex h-full items-stretch">
    <Navbar />

    <div className="flex-1 flex flex-col px-12 py-8 overflow-y-auto">
      {children}
    </div>
  </main>
);

export default Layout;
