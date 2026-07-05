import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrendingMusic, searchMusic } from "../../services/youtube";
import { MusicContext } from "../../context/MusicContext";
import { normalizeSong } from "../../utils/normalizeSong";
import SongSkeleton from "../../components/Skeleton/SongSkeleton";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import SongCard from "../../components/SongCard/SongCard";

import "./Home.css";

const Home = () => {

  const {
    search,
    submittedSearch,
    searchResults,
    setSearchResults,
    setPlaylist,
    setQueue,
    recentSongs,
    favorites,
    setCurrentSource,
    playlist,
  } = useContext(MusicContext);

  // const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const [sectionTitle, setSectionTitle] = useState("🔥 Trending Music");
  const [searchCache, setSearchCache] = useState({});

  const navigate = useNavigate();

  /* ===========================
      Trending Songs
  =========================== */

  useEffect(() => {

    const fetchSongs = async () => {

      try {

        setLoading(true);

        const data = await getTrendingMusic();

        const normalized = data.map(normalizeSong);

        // setSongs(normalized);

        setPlaylist(normalized);
setQueue(normalized);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    fetchSongs();

  }, []);

  /* ===========================
      Search Songs
  =========================== */

  useEffect(() => {

  const fetchSearch = async () => {

    if (!submittedSearch.trim()) {

      setSearchResults([]);
      setLoading(false);

      return;

    }
    const key = submittedSearch.toLowerCase();

      if (searchCache[key]) {
          console.log("Loaded from cache");

          setSearchResults(searchCache[key]);

          setLoading(false);

          return;
      }

    try {

      setLoading(true);

      const data = await searchMusic(submittedSearch);

      const normalized = data.map(normalizeSong);

      setSearchResults(normalized);

      setSearchCache((prev) => ({
          ...prev,
          [key]: normalized,
      }));

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  fetchSearch();

}, [submittedSearch, searchCache]);
  /* ===========================
      Display Songs
  =========================== */

  const displaySongs = submittedSearch.trim()
  ? searchResults
  : selectedCategory === "liked"
  ? favorites
  : playlist;

  /* ===========================
      Search Drim Songs
  =========================== */
      const isSearching = submittedSearch.trim() !== "";

      
  /* ===========================
      Playlist + Queue
  =========================== */

  useEffect(() => {

  setPlaylist(displaySongs);

  setQueue(displaySongs);

  if (submittedSearch.trim()) {
    setCurrentSource({
      type: "search",
      query: submittedSearch,
    });
  } else {
    setCurrentSource({
      type: "trending",
      query: selectedCategory,
    });
  }

}, [
  displaySongs,
  submittedSearch,
  selectedCategory,
]);

/* ===========================
      Load Category
  =========================== */

  const loadCategory = async (category) => {
    try {
      setLoading(true);

      setSelectedCategory(category);

      if (category === "liked") {
        setSectionTitle("❤️ Liked Songs");
        return;
      }

      if (category === "trending") {
        setSectionTitle("🔥 Trending Music");

        const data = await getTrendingMusic();
        setSongs(data.map(normalizeSong));
        return;
      }

      if (category === "Chill Mix") {
        setSectionTitle("🎧 Chill Mix");
      }

      if (category === "New Songs 2026") {
        setSectionTitle("🚀 New Releases");
      }

      const data = await searchMusic(category);
      setSongs(data.map(normalizeSong));

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="home">

        {/* Hero */}
        {!isSearching && (
          <>
            <section className="hero">
              <div className="hero-content">

                <span className="hero-badge">
                  Welcome Back 👋
                </span>

                <h1>
                  {new Date().getHours() < 12
                    ? "Good Morning ☀️"
                    : new Date().getHours() < 18
                    ? "Good Afternoon 🌤️"
                    : "Good Evening 🌙"}
                </h1>

                <p>
                  Discover trending music and enjoy your favorite songs anytime.
                </p>

                <button className="hero-btn">
                  ▶ Play Trending
                </button>

              </div>
            </section>

            <section className="quick-grid">

              <div
                className={`quick-card ${
                  selectedCategory === "liked" ? "active" : ""
                }`}
                onClick={() => loadCategory("liked")}
              >
                <div className="emoji">❤️</div>
                <h3>Liked Songs</h3>
                <p>Your favorites</p>
              </div>

              <div
                className={`quick-card ${
                  selectedCategory === "trending" ? "active" : ""
                }`}
                onClick={() => loadCategory("trending")}
              >
                <div className="emoji">🔥</div>
                <h3>Trending</h3>
                <p>Popular now</p>
              </div>

              <div
                className={`quick-card ${
                  selectedCategory === "chill" ? "active" : ""
                }`}
                onClick={() => loadCategory("Chill Mix")}
              >
                <div className="emoji">🎧</div>
                <h3>Chill Mix</h3>
                <p>Relax & Enjoy</p>
              </div>

              <div
                className={`quick-card ${
                  selectedCategory === "new" ? "active" : ""
                }`}
                onClick={() => loadCategory("New Songs 2026")}
              >
                <div className="emoji">🚀</div>
                <h3>New Releases</h3>
                <p>Fresh music</p>
              </div>

            </section>
          </>
        )}

        {/* No Results */}

        {!loading &&
          isSearching &&
          displaySongs.length === 0 && (
            <div className="no-results">
              <h2>No Songs Found 😔</h2>
              <p>Try another search.</p>
            </div>
        )}

        {/* Songs */}

        {loading ? (
          <div className="songs-grid">
            {Array.from({ length: 12 }).map((_, index) => (
              <SongSkeleton key={index} />
            ))}
          </div>
        ) : (
          <section className="music-section">

            <div className="section-title">
              <h2>
                {isSearching
                  ? `Search Results (${displaySongs.length})`
                  : sectionTitle}
              </h2>

              {!isSearching && (
                <button className="see-all"
                    onClick={() =>
                        navigate(`/category/${selectedCategory}`)
                    }
                >
                    See All
                </button>
              )}
            </div>

            <div className="songs-grid">

              {displaySongs.map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  index={index}
                  playlist={displaySongs}
                />
              ))}

            </div>

          </section>
        )}

        {/* Recent */}

        {!isSearching && recentSongs.length > 0 && (
          <section className="music-section">

            <div className="section-title">

              <div>
                <span className="section-tag">
                  History
                </span>

                <h2>🕒 Recently Played</h2>
              </div>

            </div>

            <div className="songs-grid">

              {recentSongs.map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  index={index}
                  // playlist={recentSongs}
                />
              ))}

            </div>

          </section>
        )}

      </div>
    </MainLayout>
  );

};

export default Home;