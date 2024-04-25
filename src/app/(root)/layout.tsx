import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/utils/cn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pass-in Event",
  description: "Application pass-in checked attendee",
  icons: {
    icon: [
      {
        url: "/nlw-unite-icon.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={cn(inter.className, "bg-zinc-900")}>
        {children}
      </body>
    </html>
  );
}
