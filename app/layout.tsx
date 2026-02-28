import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Personal portfolio and admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-black text-white w-full">
        {children}
      </body>
    </html>
  );
}
