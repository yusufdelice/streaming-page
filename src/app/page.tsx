"use client";

import { useState } from "react";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import ChatPanel from "@/components/ChatPanel";
import AuthModal from "@/components/AuthModal";
import DiscordWidget from "@/components/DiscordWidget";
import ClientInfo from "@/components/ClientInfo";

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Header onOpenAuth={() => setAuthOpen(true)} />

      <main className="main-layout">
        {/* Left / Top — video */}
        <section className="stream-section">
          <VideoPlayer />
          <DiscordWidget />
          <ClientInfo />
        </section>

        {/* Right / Bottom — chat */}
        <ChatPanel onOpenAuth={() => setAuthOpen(true)} />
      </main>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
