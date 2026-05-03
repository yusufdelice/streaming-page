"use client";

export default function VideoPlayer() {
  // Monterey Bay Aquarium – Open Sea Cam (24/7 YouTube Live)
  // Channel ID: UCt5ACnFVDEGjMqEL9Gg7JMA
  // Swap NEXT_PUBLIC_STREAM_URL in .env.local with your own HLS embed src
  const rawSrc =
    process.env.NEXT_PUBLIC_STREAM_URL ||
    "https://www.youtube.com/embed/live_stream?channel=UCt5ACnFVDEGjMqEL9Gg7JMA&autoplay=1&mute=1&rel=0&modestbranding=1";

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
          <span className="stream-label">Monterey Bay Aquarium — Open Sea Cam</span>
        </div>
        <span className="stream-sub">24/7 Live • No login required to watch</span>
      </div>
    </div>
  );
}
