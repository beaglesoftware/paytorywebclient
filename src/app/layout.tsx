import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

export const metadata: Metadata = {
  title: "Paytory",
  description: "An expense-income system.",
};

const inter = localFont({
  src: [
    {
      path: "./Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Inter-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
