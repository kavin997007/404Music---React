import { useContext } from "react";
import ReactPlayer from "react-player";
import { MusicContext } from "../../context/MusicContext";


console.log("ReactPlayer =", ReactPlayer);
const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    setPlayed,
  } = useContext(MusicContext);

  if (!currentSong) return null;

  return (
    <ReactPlayer
    url={`https://www.youtube.com/watch?v=${currentSong.id}`}
    playing={isPlaying}
    controls
    width="600px"
    height="340px"
/>
  );
};

export default MusicPlayer;