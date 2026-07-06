import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { MusicContext } from "../../context/MusicContext";

import "./Queue.css";

const Queue = () => {
  const {
    queue,
    currentSong,
    playlist,

    setCurrentSong,
    setCurrentIndex,
    setIsPlaying,

    setPlayed,
    setDuration,

    setPlayer,

    removeFromQueue,
  } = useContext(MusicContext);

  if (!queue.length) return null;

  const playSong = (song) => {
    // Find the song's real index in the global playlist
    const realIndex = playlist.findIndex((s) => s.id === song.id);

    setPlayer(null);
    setPlayed(0);
    setDuration(0);

    setCurrentSong(song);
    setCurrentIndex(realIndex !== -1 ? realIndex : 0);
    setIsPlaying(true);
  };

  const handleRemove = (e, songId) => {
    e.stopPropagation();
    removeFromQueue(songId);
  };

  return (
    <aside className="queue">
        <div className="queue-header">
            <h2>Up Next</h2>
            <span>{queue.length} Songs</span>
        </div>

      <div className="queue-list">
        {queue.map((song) => (
          <div
            key={song.id}
            className={`queue-item ${
              currentSong?.id === song.id ? "active" : ""
            }`}
          >
            <img
              src={song.thumbnail}
              alt={song.title}
              onClick={() => playSong(song)}
            />

            <div
              className="queue-info"
              onClick={() => playSong(song)}
            >
              <h4>{song.title}</h4>
              <p>{song.artist}</p>
            </div>

            <button
              className="queue-remove"
              onClick={(e) => handleRemove(e, song.id)}
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Queue;