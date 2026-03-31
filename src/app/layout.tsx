import { Figtree, Nokora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const nokora = Nokora({
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700", "900"],
  display: "swap",
  variable: "--font-nokora",
});

const ronnia = localFont({
  src: [
    {
      path: "../../public/fonts/RonniaBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ronnia",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={cn("font-sans", figtree.variable, nokora.variable, ronnia.variable)}>
      <body className="text-neutral-700 antialiased">{children}</body>
    </html>
  );
}
