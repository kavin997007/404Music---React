import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import SongCard from "../../components/SongCard/SongCard";

import "./RecentlyPlayed.css";

const RecentlyPlayed = () => {
  const { recentSongs } = useContext(MusicContext);

  return (
    <MainLayout>
      <div className="recent-page">

        <h1>🕒 Recently Played</h1>

        {recentSongs.length === 0 ? (
          <div className="empty-recent">
            <h2>No songs played yet</h2>
            <p>Play a song to see it here.</p>
          </div>
        ) : (
          <div className="songs-grid">
            {recentSongs.map((song, index) => (
              <SongCard
                key={song.id}
                song={song}
                index={index}
                playlist={recentSongs}
              />
            ))}
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default RecentlyPlayed;