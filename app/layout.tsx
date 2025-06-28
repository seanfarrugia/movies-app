import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.scss";

const font = Poppins({
  variable: "--main-font",
  subsets: ["latin"],
  weight: ["100", "400", "700"]
});

export const metadata: Metadata = {
  title: "Betsson Movies",
  description: "Movies List Exercise for Betsson",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable}`}>
        {children}
      </body>
    </html>
  );
}
