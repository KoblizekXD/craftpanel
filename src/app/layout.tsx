import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import QueryClientContextProvider from "@/components/query-client-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CraftPanel",
  description: "A modern control panel for your Minecraft servers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${jetbrainsMono.variable} antialiased`}>
        <QueryClientContextProvider>{children}</QueryClientContextProvider>
      </body>
    </html>
  );
}
