import "./globals.css";
import { SessionProvider } from "../lib/next-auth-app-dir/server";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <head>
          <title>My Stuff</title>
          <meta name="description" content="Beautiful full-stack example app" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}
