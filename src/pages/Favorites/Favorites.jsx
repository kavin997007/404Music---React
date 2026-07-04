import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import SongCard from "../../components/SongCard/SongCard";

import "./Favorites.css";

const Favorites = () => {
  const { favorites } = useContext(MusicContext);

  return (
    <MainLayout>
      <div className="favorites-page">
        <h1>❤️ Liked Songs</h1>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <h2>No liked songs yet</h2>
            <p>Tap the ❤️ icon on any song.</p>
          </div>
        ) : (
          <div className="songs-grid">
            {favorites.map((song,index) => (
              <SongCard
                key={song.id}
                song={song}
                index={index}
                playlist={favorites}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Favorites;