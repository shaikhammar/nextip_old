import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";
import MenuNavbar from "@/components/menu-navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "NextIP",
  description: "Invoice Management app",
};

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      <div className="flex min-h-screen w-full flex-col">
        <MenuNavbar />
        {children}
      </div>
    </section>
  );
}
