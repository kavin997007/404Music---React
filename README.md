# 🎵 404Music

A full-featured, YouTube-powered music streaming web app built with **React + Vite**. Stream trending tracks, search any song, manage personal playlists, browse categories, and enjoy a persistent mini/full-screen player — all powered by the YouTube Data API v3.

---

## Live Demo
https://404music.netlify.app

## ✨ Features

| Feature | Description |
|---|---|
| 🔥 Trending | Fetches real-time trending music charts (India region) via YouTube API |
| 🔍 Search | Instant search with cache to reduce API calls |
| 🎧 Categories | Browse Chill Mix, New Releases, Liked Songs, Trending |
| ❤️ Favorites | Like any song; persisted in `localStorage` |
| 🕒 Recently Played | Auto-tracks last 20 played songs; persisted |
| 📂 Playlists | Create, rename, delete user playlists; add/remove songs |
| ▶️ Full Player | Desktop bar + mobile mini-player with seek, volume, shuffle, repeat |
| 📺 Full-Screen Player | Immersive full-screen mode with artwork |
| 🔀 Shuffle & Repeat | Shuffle, Repeat All, Repeat One modes |
| ⏭️ Auto-Queue | Preloads more songs when queue runs low |
| 🌙 Dark / Light Mode | Persistent theme toggle |
| 🔐 Auth | Firebase Authentication (Email + Google Sign-In) |
| ⌨️ Keyboard Shortcuts | Play/pause, next, previous via keyboard |

---

## 🛠️ Tech Stack

- **React 19** with hooks (`useState`, `useEffect`, `useContext`)
- **Vite 8** — dev server & bundler
- **React Router DOM v7** — client-side routing
- **YouTube Data API v3** — music data source
- **react-youtube** — YouTube iframe player wrapper
- **Firebase** — authentication & user management
- **react-toastify** — notification toasts
- **react-icons** — icon library
- **Axios** — HTTP client
- **localStorage** — favorites, playlists, theme, recent songs

---

## 📁 Project Structure

```
src/
├── components/
│   ├── MusicPlayer/     # Hidden YouTube IFrame player
│   ├── Player/          # Desktop bar + mobile mini-player UI
│   ├── FullScreenPlayer/ # Full-screen player overlay
│   ├── Queue/           # "Up Next" queue panel
│   ├── SongCard/        # Reusable song tile
│   ├── SearchBar/       # Search input
│   ├── Sidebar/         # Desktop navigation
│   ├── BottomNavigation/ # Mobile bottom nav
│   └── Skeleton/        # Loading skeletons
├── context/
│   ├── MusicContext.jsx # Global state: playlist, queue, player, favorites...
│   ├── AuthContext.jsx  # Firebase auth state
│   └── ThemeContext.jsx # Dark/light mode
├── pages/
│   ├── Home/            # Trending + search + categories
│   ├── Category/        # Full category view
│   ├── PlaylistPage/    # User playlist detail
│   ├── Favorites/       # Liked songs
│   ├── RecentlyPlayed/  # Play history
│   ├── Library/         # All playlists
│   ├── Search/          # Dedicated search page
│   ├── Profile/         # User profile
│   ├── Login/           # Sign in
│   └── Signup/          # Register
├── services/
│   └── youtube.js       # YouTube API calls (trending, search, fetchMore)
├── utils/
│   └── normalizeSong.js # Normalises video API response → { id, title, artist, thumbnail }
├── hooks/
│   └── useKeyboardShortcuts.js
├── routes/
│   └── PrivateRoute.jsx
└── layouts/
    └── MainLayout/
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- A [YouTube Data API v3 key](https://console.cloud.google.com/)
- A [Firebase project](https://console.firebase.google.com/) with Authentication enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/404Music.git
cd 404Music

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🎵 How Playback Works

1. Every page that lists songs passes a `playlist` array to `<SongCard />`.
2. When the user clicks a song, `SongCard.handlePlay` sets:
   - `currentSong` — the clicked song
   - `currentIndex` — the song's position in the page's list
   - `playlist` / `queue` — the full list shown on that page
3. The hidden `<YoutubePlayer />` component renders a 1×1 YouTube iframe and manages all playback events (play/pause, song end, auto-advance, preload).
4. When the queue runs low (≤ 2 songs remaining), `preloadMoreSongs` automatically fetches more tracks based on the current `currentSource` context.

---

## ⚡ Architecture Notes

### `MusicContext` — Single Source of Truth

All playback state lives in `MusicContext`:

| State | Purpose |
|---|---|
| `currentSong` | The currently playing song object |
| `playlist` | The ordered list the player navigates through |
| `currentIndex` | Position of `currentSong` inside `playlist` |
| `queue` | Mirror of playlist shown in the Queue panel |
| `currentSource` | `{ type, query }` — tells preloader where to fetch more songs |
| `isPlaying` | Play/pause state |
| `shuffle` / `repeatMode` | Playback mode |

### Queue vs Playlist

- **`playlist`** is the authoritative ordered list used by Next/Prev logic.
- **`queue`** is the visual representation shown in the "Up Next" panel.
- Both are kept in sync every time a new song source is loaded.

---

## 🐛 Bug Fixes (v1.1)

| Bug | Root Cause | Fix |
|---|---|---|
| Next/Prev broke in Category page | `SongCard` was rendered without `playlist` prop; queue never updated on category load | Passed `songs` as `playlist` prop; call `setPlaylist`/`setQueue` on load |
| Next/Prev broke in Playlist page | Same missing `playlist` prop; playlist queue was not synced | Added `playlist={playlist.songs}` + `onPlay` callback to sync queue before play |
| Chill/New category songs not in queue | `loadCategory` only stored songs in local state, never calling `setQueue` | Added `setPlaylist(normalized)` + `setQueue(normalized)` after fetch |
| Queue panel desynced player index | `playSong` in Queue used the visual list index, not the playlist index | Fixed to `playlist.findIndex(s => s.id === song.id)` |
| Dead/unreachable code in `handleSongEnd` | Double `return` statement left lower fallback block unreachable | Removed the duplicate return and stale comments |
| Double semicolon `;;` in MusicContext | Typo | Fixed to single `;` |

---

## 📝 License

MIT — see [LICENSE](LICENSE) for details.

---

## 🙋‍♂️ Author

Built with ❤️ using React + YouTube API.  
Feel free to fork, star ⭐, and contribute!
