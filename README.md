# StreamLive — Real-Time Stream & Chat

A polished, one-page web application built with **Next.js 14** (App Router) and **Firebase**, designed to showcase a live video stream alongside a real-time, auth-gated chat.

## Features
- **Public Video Stream**: Embeds a 24/7 YouTube Live stream (Monterey Bay Aquarium by default). No login required to watch.
- **Real-Time Chat**: Built with Firebase Firestore. Visitors can read messages instantly.
- **Authentication**: Firebase Auth (Email/Password & Google Sign-In) required to post in the chat.
- **Discord Integration**: Embeds a public Discord community widget (Midjourney default) that users can expand.
- **Dark Mode UI**: Clean, glass-morphism aesthetic tailored for streaming platforms.
- **Fully Responsive**: Works seamlessly on desktop and mobile.

---

## 🚀 Setup & Deployment

### 1. Firebase Project Setup (Free Tier)
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Under **Build > Authentication**, enable **Email/Password** and **Google**.
3. Under **Build > Firestore Database**, create a database (start in production mode).
4. Go to the **Rules** tab in Firestore and replace them with the contents of the `firestore.rules` file in this repository.
5. Go to **Project Settings > General**, scroll down, and add a **Web App** `</>`.
6. Copy your Firebase config keys.

### 2. Environment Variables
1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```
2. Paste your Firebase keys into `.env.local`.
3. (Optional) Replace `NEXT_PUBLIC_STREAM_URL` with your own YouTube embed, HLS player iframe URL, or Twitch embed URL.

### 3. Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Customizing the Stream

To change the video source, edit `NEXT_PUBLIC_STREAM_URL` in your `.env.local` or directly update the default `src` inside `src/components/VideoPlayer.tsx`.
If you are given an HLS/RTMP player embed code from your provider, simply replace the `<iframe>` inside `VideoPlayer.tsx`.

## 🎮 Customizing Discord

Open `src/components/DiscordWidget.tsx` and replace the `DISCORD_SERVER_ID` constant with your own server ID. Note that your Discord server must have the "Widget" setting enabled in Server Settings.

---

## Deploying to Vercel
1. Push this code to a GitHub repository.
2. Import the project in Vercel.
3. **Important**: Add all your `NEXT_PUBLIC_FIREBASE_*` keys to Vercel's Environment Variables settings before deploying.
4. Click Deploy!
