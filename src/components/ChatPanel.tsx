"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { sendMessage, subscribeToMessages, ChatMessage } from "@/lib/firestoreChat";
import Image from "next/image";

interface ChatPanelProps {
  onOpenAuth: () => void;
}

function formatTime(ts: ChatMessage["createdAt"]): string {
  if (!ts) return "";
  const d = ts.toDate();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPanel({ onOpenAuth }: ChatPanelProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = subscribeToMessages((msgs) => setMessages(msgs));
    return unsub;
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !input.trim()) return;
    setSending(true);
    setError("");
    try {
      await sendMessage(
        user.uid,
        user.displayName ?? user.email?.split("@")[0] ?? "Anonymous",
        user.photoURL,
        input
      );
      setInput("");
    } catch {
      setError("Failed to send message. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <aside className="chat-panel">
      {/* Header */}
      <div className="chat-header">
        <span className="chat-title">Live Chat</span>
        <span className="chat-count">{messages.length} msgs</span>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.length === 0 && (
          <p className="chat-empty">No messages yet. Be the first to say hi 👋</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-msg ${msg.uid === user?.uid ? "own" : ""}`}>
            <div className="msg-avatar">
              {msg.photoURL ? (
                <Image
                  src={msg.photoURL}
                  alt={msg.displayName}
                  width={28}
                  height={28}
                  className="avatar-img"
                />
              ) : (
                <span className="avatar-initials small">
                  {msg.displayName[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div className="msg-body">
              <div className="msg-meta">
                <span className="msg-name">{msg.displayName}</span>
                <span className="msg-time">{formatTime(msg.createdAt)}</span>
              </div>
              <p className="msg-text">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {user ? (
        <form className="chat-input-form" onSubmit={handleSend}>
          {error && <p className="chat-error">{error}</p>}
          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder="Say something…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={300}
              disabled={sending}
            />
            <button
              className="btn-send"
              type="submit"
              disabled={sending || !input.trim()}
            >
              {sending ? "…" : "Send"}
            </button>
          </div>
        </form>
      ) : (
        <div className="chat-gate">
          <p className="chat-gate-text">Log in to join the conversation</p>
          <button className="btn-primary" onClick={onOpenAuth}>
            Sign In / Sign Up
          </button>
        </div>
      )}
    </aside>
  );
}
