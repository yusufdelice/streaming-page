"use client";

export default function VideoPlayer() {
  // Royalty-free 24/7 YouTube Live stream (Lofi Girl - beats to relax/study to)
  const rawSrc =
    process.env.NEXT_PUBLIC_STREAM_URL ||
    "https://www.youtube.com/embed/jfKfPFIGNEw?autoplay=1&mute=1&rel=0&modestbranding=1";

  // Helper to safely format standard YouTube links to embed format
  let src = rawSrc.trim();
  if (src.includes("youtube.com/watch?v=")) {
    src = src.replace("youtube.com/watch?v=", "youtube.com/embed/");
  } else if (src.includes("youtu.be/")) {
    src = src.replace("youtu.be/", "youtube.com/embed/");
  }

  return (
    <div className="video-wrapper">
      <div className="video-container">
        <iframe
          src={src}
          title="Live Stream"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="video-iframe"
        />
      </div>
      <div className="video-footer">
        <div className="stream-info">
          <span className="pulse-dot" />
          <span className="stream-label">Lofi Girl — Beats to Relax / Study to</span>
        </div>
        <span className="stream-sub">24/7 Live • Royalty-Free • No login required to watch</span>
      </div>
    </div>
  );
}
