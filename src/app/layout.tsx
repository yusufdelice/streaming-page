import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StreamLive — Watch Live, Chat in Real Time",
  description:
    "Watch the live stream and join the real-time chat community. No login needed to watch — sign up in seconds to participate.",
  openGraph: {
    title: "StreamLive — Watch Live, Chat in Real Time",
    description: "Live stream + real-time chat community. Watch for free, chat with an account.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
