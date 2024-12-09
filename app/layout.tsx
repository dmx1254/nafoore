import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bassirou Hamdine Sy | Excellence et Leadership au Sénégal",
  description:
    "Découvrez le parcours de Bassirou Hamdine Sy, un leader dynamique et rigoureux, engagé dans la modernisation et le progrès de l’administration publique sénégalaise.",
  icons: {
    icon: "/hamdin1.jpeg",
    shortcut: "/hamdin1.jpeg",
    apple: "/hamdin1.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex flex-col">
          {" "}
          <Navbar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
