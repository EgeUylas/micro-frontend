import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Ticaret - Ana Sayfa",
  description: "Modern e-ticaret platformu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        {children}
      </body>
    </html>
  );
}
