import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
export const MusicContext = createContext();

const MusicProvider = ({ children }) => {
  // Song
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Player
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Playback
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  // Volume (0–100)
  const [volume, setVolume] = useState(50);

  // Search
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Shuffle
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off");

  //Show Full Player
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  //Favourties
  const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  //ResentSongs
  const [recentSongs, setRecentSongs] = useState(() => {
  const saved = localStorage.getItem("recentSongs");
    return saved ? JSON.parse(saved) : [];
  });

  // Playlists
  const [playlists, setPlaylists] = useState(() => {
  const saved = localStorage.getItem("playlists");
  return saved ? JSON.parse(saved) : [
        { id: Date.now().toString(), name: "My Playlist", songs: [], },
      ];
  });

  // Queue songs
  const [queue, setQueue] = useState([]);

  //  What type of music
  const [currentSource, setCurrentSource] = useState({
  type: "trending",
  query: "",
});

// PreLoading
const [isPreloading, setIsPreloading] =
  useState(false);

  // Submit
  const [submittedSearch, setSubmittedSearch] = useState("");

  // Theme
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
});

useEffect(() => {

    if (darkMode) {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }

}, [darkMode]);

  useEffect(() => {
  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );
}, [favorites]);

useEffect(() => {
  localStorage.setItem(
    "recentSongs",
    JSON.stringify(recentSongs)
  );
}, [recentSongs]);

useEffect(() => {
  localStorage.setItem(
    "playlists",
    JSON.stringify(playlists)
  );
}, [playlists]);

const addSongToPlaylist = (playlistId, song) => {
  setPlaylists((prev) =>
    prev.map((playlist) => {
      if (playlist.id !== playlistId) {
        return playlist;
      }

      const exists = playlist.songs.some(
        (item) => item.id === song.id
      );

      if (exists) {
        toast.info("Song already exists in this playlist.");
        return playlist;
      }

      toast.success(`Added to "${playlist.name}"`);

      return {
        ...playlist,
        songs: [...playlist.songs, song],
      };
    })
  );
};;

const removeSongFromPlaylist = (playlistId, songId) => {
  setPlaylists((prev) =>
    prev.map((playlist) => {
      if (playlist.id !== playlistId) {
        return playlist;
      }

      return {
        ...playlist,
        songs: playlist.songs.filter(
          (song) => song.id !== songId
        ),
      };
    })
  );
};

const renamePlaylist = (playlistId, newName) => {
  const name = newName.trim();

  if (!name) return;

  setPlaylists((prev) =>
    prev.map((playlist) => {
      if (playlist.id !== playlistId) {
        return playlist;
      }

      return {
        ...playlist,
        name,
      };
    })
  );
};
const deletePlaylist = (playlistId) => {
  setPlaylists((prev) =>
    prev.filter((playlist) => {
      if (
        playlist.id === playlistId &&
        playlist.name === "My Playlist"
      ) {
        return true;
      }

      return playlist.id !== playlistId;
    })
  );
};

const removeFromQueue = (songId) => {
  setQueue((prev) =>
    prev.filter((song) => song.id !== songId)
  );
};

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        setCurrentSong,

        player,
        setPlayer,

        isPlaying,
        setIsPlaying,

        played,
        setPlayed,

        duration,
        setDuration,

        volume,
        setVolume,

        search,
        setSearch,

        searchResults,
        setSearchResults,

        playlist,
        setPlaylist,

        favorites,
        setFavorites,

        recentSongs,
        setRecentSongs,

        currentIndex,
        setCurrentIndex,

        shuffle,
        setShuffle,

        repeatMode,
        setRepeatMode,

        playlists,
        setPlaylists,

        addSongToPlaylist,
        removeSongFromPlaylist,

        renamePlaylist,
        deletePlaylist,

        queue,
        setQueue,

        removeFromQueue,

        showFullPlayer,
        setShowFullPlayer,

        currentSource,
        setCurrentSource,

        isPreloading,
        setIsPreloading,

        submittedSearch,
        setSubmittedSearch,

        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;