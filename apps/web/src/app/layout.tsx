"use client";
import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

// export const metadata: Metadata = {
//   title: "Oversix Gaming",
//   description: "A gaming community, with game reviews, news, and more.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
