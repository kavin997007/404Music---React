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
    duration,
  } = useContext(MusicContext);

  if (!currentSong || !showFullPlayer) return null;

  const formatTime = (sec) => {
    if (!sec) return "0:00";

    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);

    return `${m}:${s.toString().padStart(2, "0")}`;
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

        <button className="heart-btn">
          <FaHeart />
        </button>

      </div>

      {/* Progress */}

      <div className="fsp-progress">

        <span>{formatTime(played)}</span>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width:
                duration
                  ? `${(played / duration) * 100}%`
                  : "0%",
            }}
          />

        </div>

        <span>{formatTime(duration)}</span>

      </div>

      {/* Controls */}

      <div className="fsp-controls">

        <button>
          <FaStepBackward />
        </button>

        <button
          className="play-btn"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button>
          <FaStepForward />
        </button>

      </div>

        <div className="fsp-visualizer">
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