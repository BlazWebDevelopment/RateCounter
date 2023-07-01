"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { IncomeRecordsProvider } from "./context/IncomeRecordsContext";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <IncomeRecordsProvider>
        <SessionProvider session={session}>
          <body className={inter.className}>
            {children}
            <Footer />
          </body>
        </SessionProvider>
      </IncomeRecordsProvider>
    </html>
  );
}
