import { useContext, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";

const useKeyboardShortcuts = () => {
  const {
    isPlaying,
    setIsPlaying,

    volume,
    setVolume,

    player,

    playlist,
    currentIndex,

    setCurrentSong,
    setCurrentIndex,
    setPlayed,
    setDuration,
    setPlayer,

    shuffle,
  } = useContext(MusicContext);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore typing in input fields
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA"
      ) {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          setIsPlaying((prev) => !prev);
          break;

        case "ArrowRight":
          if (!playlist.length) return;

          let next =
            shuffle
              ? Math.floor(Math.random() * playlist.length)
              : (currentIndex + 1) % playlist.length;

          setPlayer(null);
          setPlayed(0);
          setDuration(0);

          setCurrentIndex(next);
          setCurrentSong(playlist[next]);
          setIsPlaying(true);
          break;

        case "ArrowLeft":
          if (!playlist.length) return;

          let prev =
            shuffle
              ? Math.floor(Math.random() * playlist.length)
              : (currentIndex - 1 + playlist.length) %
                playlist.length;

          setPlayer(null);
          setPlayed(0);
          setDuration(0);

          setCurrentIndex(prev);
          setCurrentSong(playlist[prev]);
          setIsPlaying(true);
          break;

        case "ArrowUp":
          e.preventDefault();

          if (player) {
            const newVolume = Math.min(volume + 5, 100);

            setVolume(newVolume);

            player.setVolume(newVolume);
          }
          break;

        case "ArrowDown":
          e.preventDefault();

          if (player) {
            const newVolume = Math.max(volume - 5, 0);

            setVolume(newVolume);

            player.setVolume(newVolume);
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [
    isPlaying,
    player,
    volume,
    playlist,
    currentIndex,
    shuffle,
  ]);
};

export default useKeyboardShortcuts;