export default function ClientInfo() {
  return (
    <div className="client-info-card">
      <h2 className="client-info-title">✨ Project Demo Overview</h2>
      <p className="client-info-desc">
        Welcome to your new live-streaming platform! Here is a quick breakdown of what is currently available and functioning in this demo:
      </p>

      <div className="client-info-grid">
        <div className="info-feature">
          <h3>🎥 Live Video Embed</h3>
          <p>
            The video player is set up to accept any 24/7 iframe embed (currently showing the Monterey Bay Aquarium as a placeholder). Viewers can watch the stream instantly without needing an account.
          </p>
        </div>

        <div className="info-feature">
          <h3>💬 Real-Time Chat</h3>
          <p>
            Built using Firebase Firestore. Messages appear instantly for everyone. Guests can read the chat, but only logged-in users are permitted to send messages.
          </p>
        </div>

        <div className="info-feature">
          <h3>🔐 Authentication System</h3>
          <p>
            Fully functioning Firebase Authentication. Users can securely create an account with an email and password, or use the "Continue with Google" one-click social login.
          </p>
        </div>

        <div className="info-feature">
          <h3>🎮 Discord Integration</h3>
          <p>
            An interactive Discord widget is embedded directly into the page. Visitors can see active community members and join your server directly from the stream page.
          </p>
        </div>
      </div>
      
      <div className="info-footer">
        <p><strong>Note:</strong> The video stream source and Discord server ID can easily be swapped out in the environment variables before the final production launch.</p>
      </div>
    </div>
  );
}
