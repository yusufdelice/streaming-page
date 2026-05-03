"use client";

import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

interface HeaderProps {
  onOpenAuth: () => void;
}

export default function Header({ onOpenAuth }: HeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="header">
      <div className="header-logo">
        <span className="logo-dot" />
        <span className="logo-text">StreamLive</span>
        <span className="live-badge">LIVE</span>
      </div>

      <div className="header-right">
        {user ? (
          <div className="user-menu">
            <div className="user-avatar">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName ?? "User"}
                  width={32}
                  height={32}
                  className="avatar-img"
                />
              ) : (
                <span className="avatar-initials">
                  {(user.displayName ?? user.email ?? "U")[0].toUpperCase()}
                </span>
              )}
            </div>
            <span className="user-name">{user.displayName ?? user.email?.split("@")[0]}</span>
            <button className="btn-ghost" onClick={signOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <button className="btn-primary" onClick={onOpenAuth}>
            Join Chat
          </button>
        )}
      </div>
    </header>
  );
}
