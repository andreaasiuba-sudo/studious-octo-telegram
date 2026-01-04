import type { Metadata } from "next";
import { Inter, Cormorant } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "PERA Y LIMÓN",
  description: "Accesorios que susurran historias. Piezas artesanales que abrazan tu esencia y celebran lo irrepetible que hay en ti.",
  icons: {
    icon: "/images/ChatGPT Image Jan 4, 2026, 02_59_51 PM.png",
    apple: "/images/ChatGPT Image Jan 4, 2026, 02_59_51 PM.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
