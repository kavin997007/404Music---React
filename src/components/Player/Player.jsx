import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedo,
} from "react-icons/fa";

import "./Player.css";

const Player = () => {
  const {
    currentSong,

    isPlaying,
    setIsPlaying,

    player,
    setPlayer,

    volume,
    setVolume,

    played,
    duration,

    playlist,
    currentIndex,

    setCurrentSong,
    setCurrentIndex,

    setPlayed,
    setDuration,

    shuffle,
    setShuffle,

    repeatMode,
    setRepeatMode,

    showFullPlayer,
    setShowFullPlayer,
  } = useContext(MusicContext);

  if (!currentSong) return null;

  // Format Time
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Seek
  const handleSeek = (e) => {
    const newTime = Number(e.target.value);

    setPlayed(newTime);

    if (player) {
      player.seekTo(newTime, true);

      if (!isPlaying) {
        player.pauseVideo();
      }
    }
  };

  // Previous
  const handlePrevious = () => {
    if (!playlist.length) return;

    let prevIndex;

    if (shuffle) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
      prevIndex =
        (currentIndex - 1 + playlist.length) %
        playlist.length;
    }

    setPlayer(null);

    setPlayed(0);
    setDuration(0);

    setCurrentIndex(prevIndex);
    setCurrentSong(playlist[prevIndex]);

    setIsPlaying(true);
  };

  // Next
  const handleNext = () => {
    if (!playlist.length) return;

    let nextIndex;

    if (shuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex =
        (currentIndex + 1) % playlist.length;
    }

    setPlayer(null);

    setPlayed(0);
    setDuration(0);

    setCurrentIndex(nextIndex);
    setCurrentSong(playlist[nextIndex]);

    setIsPlaying(true);
  };

  // Volume
  const handleVolume = (e) => {
    const value = Number(e.target.value);

    setVolume(value);

    if (player) {
      player.setVolume(value);
    }
  };

  // Repeat Mode
  const changeRepeatMode = () => {
    if (repeatMode === "off") {
      setRepeatMode("all");
    } else if (repeatMode === "all") {
      setRepeatMode("one");
    } else {
      setRepeatMode("off");
    }
  };

  const renderVolumeIcon = () => {
  if (volume === 0) return <FaVolumeMute />;
  if (volume <= 50) return <FaVolumeDown />;
  return <FaVolumeUp />;
};

  console.log("Playlist:", playlist.length);
  console.log("Current Index:", currentIndex);

  return (
  <>
    {/* Desktop Player */}
    <div className="player desktop-player">

      {/* LEFT */}
      <div
        className="player-left"
        onClick={() => setShowFullPlayer(true)}
      >
        <div className="album-wrapper">
          <img
            src={currentSong.thumbnail}
            alt={currentSong.title}
            className={
              isPlaying
                ? "player-album playing"
                : "player-album"
            }
          />

          <div className="album-glow"></div>
        </div>

        <div className="player-song">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      {/* CENTER */}

      <div className="player-center">

        <div className="controls">

          <button
            className={`control-btn ${
              shuffle ? "active" : ""
            }`}
            onClick={() => setShuffle(!shuffle)}
          >
            <FaRandom />
          </button>

          <button
            className="control-btn"
            onClick={handlePrevious}
          >
            <FaStepBackward />
          </button>

          <button
            className="play-btn-main"
            onClick={() =>
              setIsPlaying(!isPlaying)
            }
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button
            className="control-btn"
            onClick={handleNext}
          >
            <FaStepForward />
          </button>

          <button
            className={`control-btn ${
              repeatMode !== "off"
                ? "active"
                : ""
            }`}
            onClick={changeRepeatMode}
          >
            <FaRedo />

            {repeatMode === "one" && (
              <span className="repeat-badge">
                1
              </span>
            )}

          </button>

        </div>

        <div className="progress">

          <span>{formatTime(played)}</span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={played}
            onChange={handleSeek}
          />

          <span>{formatTime(duration)}</span>

        </div>

      </div>

      {/* RIGHT */}

      <div className="player-right">

        <div className="volume-icon">
          {renderVolumeIcon()}
        </div>

        <input
          className="volume-slider"
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolume}
        />

      </div>

    </div>

    {/* Mobile Mini Player */}

    <div className="mini-player">

      <div
        className="mini-left"
        onClick={() => setShowFullPlayer(true)}
      >

        <img
          src={currentSong.thumbnail}
          alt={currentSong.title}
        />

        <div>

          <h4>{currentSong.title}</h4>

          <p>{currentSong.artist}</p>

        </div>

      </div>

      <button
        className="mini-play"
        onClick={(e) => {
          e.stopPropagation();
          setIsPlaying(!isPlaying);
        }}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

    </div>
  </>
);
};

export default Player;