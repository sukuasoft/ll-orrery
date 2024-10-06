import type { Metadata } from "next";
import "./main.css";

export const metadata: Metadata = {
  title: "LL Orrery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
     
      >
        {children}
      </body>
    </html>
  );
}
