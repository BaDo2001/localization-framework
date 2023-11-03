import type { FC, PropsWithChildren } from "react";

import { ClerkProvider } from "@clerk/nextjs";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Localization Admin",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <ClerkProvider>
    <html lang="en">
      <body className={clsx(inter.className, "h-screen bg-base-300")}>
        {children}
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
