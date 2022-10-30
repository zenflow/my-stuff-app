import "./globals.css";
import { NextAuthSessionProvider } from "../lib/next-auth-session-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthSessionProvider>
      <html lang="en">
        <head>
          <title>My Stuff</title>
          <meta name="description" content="Beautiful full-stack example app" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body>{children}</body>
      </html>
    </NextAuthSessionProvider>
  );
}
