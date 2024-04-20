import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components";
import { ChakraProvider } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "ТВИМС",
  description: "Новопольский государственно аграрно экономический колледж",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <ChakraProvider>
          <Header/>
          {children}
          <Footer/>
        </ChakraProvider>
      </body>
    </html>
  );
}
