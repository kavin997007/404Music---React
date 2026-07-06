import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";

import {
  FaChevronDown,
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaHeart,
  FaEllipsisH,
} from "react-icons/fa";

import "./FullScreenPlayer.css";

const FullScreenPlayer = () => {

  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    showFullPlayer,
    setShowFullPlayer,
    played,
    setPlayed,
    duration,
    player,
    playlist,
    currentIndex,
    setCurrentIndex,
    setCurrentSong,
    setPlayer,
    setDuration,
    shuffle,
    favorites,
    setFavorites,
  } = useContext(MusicContext);

  if (!currentSong || !showFullPlayer) return null;

  /* ── Helpers ── */

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const isFavorite = favorites.some((item) => item.id === currentSong.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((item) => item.id !== currentSong.id));
    } else {
      setFavorites([...favorites, currentSong]);
    }
  };

  /* ── Seek ── */

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    setPlayed(newTime);
    if (player) {
      player.seekTo(newTime, true);
    }
  };

  /* ── Previous ── */

  const handlePrevious = () => {
    if (!playlist.length) return;
    const prevIndex = shuffle
      ? Math.floor(Math.random() * playlist.length)
      : (currentIndex - 1 + playlist.length) % playlist.length;

    setPlayer(null);
    setPlayed(0);
    setDuration(0);
    setCurrentIndex(prevIndex);
    setCurrentSong(playlist[prevIndex]);
    setIsPlaying(true);
  };

  /* ── Next ── */

  const handleNext = () => {
    if (!playlist.length) return;
    const nextIndex = shuffle
      ? Math.floor(Math.random() * playlist.length)
      : (currentIndex + 1) % playlist.length;

    setPlayer(null);
    setPlayed(0);
    setDuration(0);
    setCurrentIndex(nextIndex);
    setCurrentSong(playlist[nextIndex]);
    setIsPlaying(true);
  };



  return (

    <div className="fullscreen-player">

      {/* Header */}

      <div className="fsp-header">

        <button
          className="fsp-close"
          onClick={() => setShowFullPlayer(false)}
        >
          <FaChevronDown />
        </button>

        <span>NOW PLAYING</span>

        <button className="fsp-menu">
          <FaEllipsisH />
        </button>

      </div>

      {/* Album */}

      <div className="fsp-album">

        <img
          className={isPlaying ? "playing" : ""}
          src={currentSong.thumbnail}
          alt={currentSong.title}
        />

      </div>

      {/* Info */}

      <div className="fsp-info">

        <div>
          <h2>{currentSong.title}</h2>
          <p>{currentSong.artist}</p>
        </div>

        <button
          className={`heart-btn ${isFavorite ? "liked" : ""}`}
          onClick={toggleFavorite}
        >
          <FaHeart />
        </button>

      </div>

      {/* Progress — now a real seekable input range */}

      <div className="fsp-progress">

        <span>{formatTime(played)}</span>

        <input
          type="range"
          className="fsp-seek"
          min="0"
          max={duration || 0}
          value={played}
          onChange={handleSeek}
        />

        <span>{formatTime(duration)}</span>

      </div>

      {/* Controls */}

      <div className="fsp-controls">

        <button onClick={handlePrevious}>
          <FaStepBackward />
        </button>

        <button
          className="play-btn"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button onClick={handleNext}>
          <FaStepForward />
        </button>

      </div>

        <div className={`fsp-visualizer ${isPlaying ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>

    </div>

  );

};

export default FullScreenPlayer;