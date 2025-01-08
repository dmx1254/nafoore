import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bassirou Hamedine SY | Excellence et Leadership au Sénégal",
  description:
    "Découvrez le parcours de Bassirou Hamedine SY, un leader dynamique et rigoureux, engagé dans la modernisation et le progrès de l’administration publique sénégalaise.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
        <div className="flex flex-col antialiased">
          {" "}
          <Navbar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
