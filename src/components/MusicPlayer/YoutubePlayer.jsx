import { useContext, useEffect } from "react";
import YouTube from "react-youtube";
import { MusicContext } from "../../context/MusicContext";

const YoutubePlayer = () => {
  const {
    currentSong,

    player,
    setPlayer,

    isPlaying,
    setIsPlaying,

    volume,

    setPlayed,
    setDuration,

    playlist,
    currentIndex,

    setCurrentSong,
    setCurrentIndex,

    shuffle,
    repeatMode,
  } = useContext(MusicContext);

  // -----------------------------
  // Play / Pause
  // -----------------------------
  useEffect(() => {
    if (!player) return;

    if (isPlaying) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  }, [isPlaying, player]);

  // -----------------------------
  // Volume
  // -----------------------------
  useEffect(() => {
    if (!player) return;

    player.setVolume(volume);
  }, [volume, player]);

  // -----------------------------
  // Change Song
  // -----------------------------
  // useEffect(() => {
  //   if (!player || !currentSong) return;

  //   try {
  //     player.loadVideoById(currentSong.id);
  //     player.playVideo();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [currentSong, player]);

  // -----------------------------
  // Progress
  // -----------------------------
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      try {
        const state = player.getPlayerState();

        if (state === 1 || state === 2) {
          setPlayed(player.getCurrentTime());
          setDuration(player.getDuration());
        }
      } catch (err) {
        console.log(err);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [player, setPlayed, setDuration]);

  // -----------------------------
  // No Song
  // -----------------------------
  if (!currentSong) return null;

  const opts = {
    width: "1",
    height: "1",
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      modestbranding: 1,
    },
  };

  // -----------------------------
  // Song End
  // -----------------------------
  const handleSongEnd = () => {
    if (!playlist.length) {
      setIsPlaying(false);
      return;
    }

    let nextIndex = currentIndex;

    // Repeat One
    if (repeatMode === "one") {
      nextIndex = currentIndex;
    }

    // Shuffle
    else if (shuffle) {
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (
        playlist.length > 1 &&
        nextIndex === currentIndex
      );
    }

    // Normal
    else {
      nextIndex = currentIndex + 1;

      if (nextIndex >= playlist.length) {
        if (repeatMode === "all") {
          nextIndex = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }
    }

    setPlayed(0);
    setDuration(0);

    setCurrentIndex(nextIndex);
    setCurrentSong(playlist[nextIndex]);
    setIsPlaying(true);
  };

//   useEffect(() => {
//   return () => {
//     setPlayer(null);
//   };
// }, [setPlayer]);

  return (
    <YouTube
      videoId={currentSong.id}
      opts={opts}
      onReady={(event) => {
        const ytPlayer = event.target;

        setPlayer(ytPlayer);

        ytPlayer.setVolume(volume);

        if (currentSong) {
          ytPlayer.loadVideoById(currentSong.id);
          ytPlayer.playVideo();
        }

        setDuration(ytPlayer.getDuration());
        setIsPlaying(true);
      }}
      onStateChange={(event) => {
        console.log("Player State:", event.data);
      }}
      onEnd={handleSongEnd}
      onError={(event) => {
        console.log("YouTube Error:", event.data);
      }}
    />
  );
};

export default YoutubePlayer;