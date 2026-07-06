import { useContext } from "react";
import { FaPlay, FaHeart, FaPlus } from "react-icons/fa";
import { MusicContext } from "../../context/MusicContext";
import { toast } from "react-toastify";

import "./SongCard.css";

const SongCard = ({ song, index, playlist, onPlay }) => {
  const {
    currentSong,
    setCurrentSong,

    setCurrentIndex,

    setPlayer,
    setIsPlaying,

    setPlayed,
    setDuration,

    isPlaying,

    favorites,
    setFavorites,
    
    recentSongs,
    setRecentSongs,

    playlists,
    addSongToPlaylist,

    setPlaylist,

    setQueue,
  } = useContext(MusicContext);

  const isActive = currentSong?.id === song.id;

  const isFavorite = favorites.some(
    (item) => item.id === song.id
  );

  const handlePlay = () => {
    // Resume if clicking the currently selected song
    if (isActive) {
      setIsPlaying(true);
      return;
    }

    // Allow caller (e.g. PlaylistPage) to override queue first
    if (onPlay) onPlay();

    // Save current playlist index
    setCurrentIndex(index);

    // Reset previous player
    setPlayer(null);

    // Reset progress
    setPlayed(0);
    setDuration(0);

    // Set current song
    setCurrentSong(song);

    if (playlist) {
        setPlaylist(playlist);
        setQueue(playlist);
    }
  
    const updatedRecent = [
        song,
      ...recentSongs.filter((item) => item.id !== song.id),
    ].slice(0, 20);

    setRecentSongs(updatedRecent);

    // Start playback
    setIsPlaying(true);

    toast.success(`🎵 Now Playing: ${song.title}`);
  };

  // Favorites
  const toggleFavorite = (e) => {
  e.stopPropagation();

  if (isFavorite) {
    setFavorites(
      favorites.filter((item) => item.id !== song.id)
    );
  } else {
    setFavorites([...favorites, song]);
  }
};


const handleAddToPlaylist = (e) => {
  e.stopPropagation();

  if (playlists.length === 0) {
    alert("No playlists available.");
    return;
  }

  const playlistNames = playlists
    .map((p, index) => `${index + 1}. ${p.name}`)
    .join("\n");

  const choice = prompt(
    `Select playlist:\n\n${playlistNames}\n\nEnter playlist number:`
  );

  if (!choice) return;

  const index = Number(choice) - 1;

  if (index < 0 || index >= playlists.length) {
    alert("Invalid playlist.");
    return;
  }

  // addSongToPlaylist(playlists[index].id, song);

  // alert(`Added to "${playlists[index].name}"`);

  addSongToPlaylist(playlists[index].id, song);
};


  return (
    <div
      className={`song-card ${isActive ? "active" : ""}`}
      onClick={handlePlay}
    >
      <div className="song-image">

        <img
          src={song.thumbnail}
          alt={song.title}
          className={isActive && isPlaying ? "album playing" : "album"}
        />

        <div className="image-overlay">

          <button
            className={`favorite-btn ${isFavorite ? "liked" : ""}`}
            onClick={toggleFavorite}
          >
            <FaHeart />
          </button>

          <button
            className="play-btn"
            onClick={(e) => {
              e.stopPropagation();
              handlePlay();
            }}
          >
            <FaPlay />
          </button>

          <button
            className="playlist-btn"
            onClick={handleAddToPlaylist}
          >
            <FaPlus />
          </button>

        </div>

      </div>

      <div className="song-info">

        <h4>{song.title}</h4>

        <p>{song.artist}</p>

      </div>

    </div>
  );
};

export default SongCard;