import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";
import MenuNavbar from "@/components/menu-navbar";
import { Toaster } from "@/components/ui/toaster";
import { getCompanies } from "@/actions/company.actions";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "NextIP",
  description: "Invoice Management app",
};

export default async function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { companies } = await getCompanies();
  return (
    <section
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      <div className="flex min-h-screen w-full flex-col">
        <MenuNavbar companies={companies!} />
        {children}
        <Toaster />
        {/* <Footer /> */}
      </div>
    </section>
  );
}
