import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { shadesOfPurple } from "@clerk/themes";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Titanic club | RPL",
  description: " A Donation platform for all ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <ClerkProvider
            appearance={{
              baseTheme: shadesOfPurple,
            }}>
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
