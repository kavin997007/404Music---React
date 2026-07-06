import { useContext, useEffect } from "react";
import YouTube from "react-youtube";

import { MusicContext } from "../../context/MusicContext";

import {
  fetchMoreSongs,
  getTrendingMusic,
} from "../../services/youtube";

import { normalizeSong } from "../../utils/normalizeSong";

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
    setPlaylist,

    setQueue,

    currentIndex,
    setCurrentIndex,

    setCurrentSong,

    shuffle,
    repeatMode,

    currentSource,

    isPreloading,
    setIsPreloading,

  } = useContext(MusicContext);

  /* ------------------------
      Play / Pause
  ------------------------ */

  useEffect(() => {

    if (!player) return;

    if (isPlaying) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }

  }, [isPlaying, player]);

  /* ------------------------
      Volume
  ------------------------ */

  useEffect(() => {

    if (!player) return;

    player.setVolume(volume);

  }, [volume, player]);

  /* ------------------------
      Progress
  ------------------------ */

  useEffect(() => {

    if (!player) return;

    const interval = setInterval(() => {

      try {

        const state =
          player.getPlayerState();

        if (state === 1 || state === 2) {

          setPlayed(
            player.getCurrentTime()
          );

          setDuration(
            player.getDuration()
          );

        }

      }

      catch (err) {

        console.log(err);

      }

    }, 500);

    return () => clearInterval(interval);

  }, [
    player,
    setPlayed,
    setDuration,
  ]);

  /* ------------------------
      Preload Songs
  ------------------------ */

  const preloadMoreSongs = async () => {

    if (isPreloading) return;

    try {

      setIsPreloading(true);

      const data =
        await fetchMoreSongs(currentSource);

      let songs =
        data.map(normalizeSong);

      const ids = new Set(
        playlist.map(song => song.id)
      );

      songs = songs.filter(
        song => !ids.has(song.id)
      );

      if (!songs.length) {

        const trending =
          await getTrendingMusic();

        songs = trending
          .map(normalizeSong)
          .filter(
            song => !ids.has(song.id)
          );

      }

      if (!songs.length) return;

      const updated = [
        ...playlist,
        ...songs,
      ];

      setPlaylist(updated);

      setQueue(updated);

      console.log(
        "Preloaded",
        songs.length,
        "songs"
      );

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setIsPreloading(false);

    }

  };

  /* ------------------------
      Detect Near End
  ------------------------ */

  useEffect(() => {

    if (!playlist.length) return;

    const remaining =
      playlist.length -
      currentIndex -
      1;

    if (
      remaining <= 2 &&
      !isPreloading
    ) {

      preloadMoreSongs();

    }

  }, [
    currentIndex,
    playlist,
    isPreloading,
    currentSource
  ]);

  
    /* ------------------------
      Song End
  ------------------------ */

  const handleSongEnd = async () => {

    if (!playlist.length) {

      setIsPlaying(false);

      return;

    }

    let nextIndex;

    /* Repeat One */

    if (repeatMode === "one") {

      nextIndex = currentIndex;

    }

    /* Shuffle */

    else if (shuffle) {

      do {

        nextIndex = Math.floor(
          Math.random() * playlist.length
        );

      }

      while (

        playlist.length > 1 &&
        nextIndex === currentIndex

      );

    }

    /* Normal */

    else {

      nextIndex = currentIndex + 1;

      /* Repeat All */

      if (
        nextIndex >= playlist.length &&
        repeatMode === "all"
      ) {

        nextIndex = 0;

      }

      /* End of Playlist – stop playback */

      else if (nextIndex >= playlist.length) {

        await preloadMoreSongs();

        setIsPlaying(false);

        return;

      }

    }

    /* Play Next Song */

    setPlayed(0);

    setDuration(0);

    setCurrentIndex(nextIndex);

    setCurrentSong(
      playlist[nextIndex]
    );

    setIsPlaying(true);

  };
  /* ------------------------
    No Song
------------------------ */

if (!currentSong) return null;

/* ------------------------
    Player Options
------------------------ */

const opts = {
  width: "1",
  height: "1",
  playerVars: {
    autoplay: 1,
    controls: 0,
    rel: 0,
    modestbranding: 1,
    playsinline: 1,
  },
};

return (
  <YouTube
    key={currentSong.id}
    videoId={currentSong.id}
    opts={opts}

    onReady={(event) => {

      const ytPlayer = event.target;

      setPlayer(ytPlayer);

      ytPlayer.setVolume(volume);

      if(isPlaying){
          ytPlayer.playVideo();
      }

      setDuration(
        ytPlayer.getDuration()
      );

      setIsPlaying(true);

    }}

    onStateChange={(event) => {

      switch (event.data) {

        // Playing
        case 1:
          setIsPlaying(true);
          break;

        // Paused
        case 2:
          setIsPlaying(false);
          break;

        default:
          break;

      }

    }}

    onEnd={handleSongEnd}

    onError={(event)=>{

      console.log(event.data);

      if(currentIndex < playlist.length-1){

          handleSongEnd();

      }else{

          setIsPlaying(false);

      }

    }}

  />
);
};

export default YoutubePlayer;