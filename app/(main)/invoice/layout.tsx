import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/app/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "NextIP",
  description: "Invoice Management app",
};

export default async function InvoiceRootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      {props.children}
      {props.modal}
      <div id="modal-root" />
    </section>
  );
}
