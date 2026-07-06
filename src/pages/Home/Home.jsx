import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrendingMusic, searchMusic } from "../../services/youtube";
import { MusicContext } from "../../context/MusicContext";
import { normalizeSong } from "../../utils/normalizeSong";
import SongSkeleton from "../../components/Skeleton/SongSkeleton";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import SongCard from "../../components/SongCard/SongCard";

import "./Home.css";

// Map of tab key → { title, searchQuery }
// trending uses getTrendingMusic(); others use searchMusic(query)
const CATEGORIES = {
  trending: { title: "🔥 Trending Music",  query: null },
  chill:    { title: "🎧 Chill Mix",        query: "Chill Mix" },
  new:      { title: "🚀 New Releases",     query: "New Songs 2026" },
  liked:    { title: "❤️ Liked Songs",     query: null },
};

const Home = () => {

  const {
    submittedSearch,
    searchResults,
    setSearchResults,
    setPlaylist,
    setQueue,
    recentSongs,
    favorites,
    setCurrentSource,
  } = useContext(MusicContext);

  const [loading, setLoading]               = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const [sectionTitle, setSectionTitle]     = useState("🔥 Trending Music");

  // Use a ref for the search cache so updating it never triggers a re-render loop
  const searchCacheRef = useRef({});

  const [categorySongs, setCategorySongs] = useState({
    trending: [],
    chill:    [],
    new:      [],
  });

  const navigate = useNavigate();

  /* ===========================
      Load Trending on mount
  =========================== */

  useEffect(() => {

    const fetchTrending = async () => {

      try {

        setLoading(true);

        const data       = await getTrendingMusic();
        const normalized = data.map(normalizeSong);

        setCategorySongs((prev) => ({ ...prev, trending: normalized }));

        // Set initial global queue to trending
        setPlaylist(normalized);
        setQueue(normalized);
        setCurrentSource({ type: "trending", query: "" });

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    fetchTrending();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ===========================
      Search Songs
  =========================== */

  useEffect(() => {

    const fetchSearch = async () => {

      if (!submittedSearch.trim()) {
        setSearchResults([]);
        return;
      }

      const key = submittedSearch.toLowerCase();

      // Check ref cache first — no re-render triggered
      if (searchCacheRef.current[key]) {
        setSearchResults(searchCacheRef.current[key]);
        setPlaylist(searchCacheRef.current[key]);
        setQueue(searchCacheRef.current[key]);
        setCurrentSource({ type: "search", query: submittedSearch });
        return;
      }

      try {

        setLoading(true);

        const data       = await searchMusic(submittedSearch);
        const normalized = data.map(normalizeSong);

        // Store in ref (no re-render)
        searchCacheRef.current[key] = normalized;

        setSearchResults(normalized);
        setPlaylist(normalized);
        setQueue(normalized);
        setCurrentSource({ type: "search", query: submittedSearch });

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    fetchSearch();

  // searchCacheRef is a ref, intentionally excluded from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submittedSearch]);

  /* ===========================
      Display Songs
  =========================== */

  const displaySongs = submittedSearch.trim()
    ? searchResults
    : selectedCategory === "liked"
    ? favorites
    : categorySongs[selectedCategory] || [];

  const isSearching = submittedSearch.trim() !== "";

  /* ===========================
      Load Category
  =========================== */

  const loadCategory = async (category) => {

    try {

      setLoading(true);
      setSelectedCategory(category);
      setSectionTitle(CATEGORIES[category]?.title || category);

      if (category === "liked") {
        setPlaylist(favorites);
        setQueue(favorites);
        setCurrentSource({ type: "liked", query: "" });
        return;
      }

      if (category === "trending") {
        const data       = await getTrendingMusic();
        const normalized = data.map(normalizeSong);

        setCategorySongs((prev) => ({ ...prev, trending: normalized }));
        setPlaylist(normalized);
        setQueue(normalized);
        setCurrentSource({ type: "trending", query: "" });
        return;
      }

      // chill / new — use their mapped search query
      const searchQuery = CATEGORIES[category]?.query || category;
      const data        = await searchMusic(searchQuery);
      const normalized  = data.map(normalizeSong);

      setCategorySongs((prev) => ({ ...prev, [category]: normalized }));
      setPlaylist(normalized);
      setQueue(normalized);
      setCurrentSource({ type: "category", query: searchQuery });

    } catch (err) {

      console.error(err);

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

                <button
                  className="hero-btn"
                  onClick={() => loadCategory("trending")}
                >
                  ▶ Play Trending
                </button>

              </div>
            </section>

            <section className="quick-grid">

              <div
                className={`quick-card ${selectedCategory === "liked" ? "active" : ""}`}
                onClick={() => loadCategory("liked")}
              >
                <div className="emoji">❤️</div>
                <h3>Liked Songs</h3>
                <p>Your favorites</p>
              </div>

              <div
                className={`quick-card ${selectedCategory === "trending" ? "active" : ""}`}
                onClick={() => loadCategory("trending")}
              >
                <div className="emoji">🔥</div>
                <h3>Trending</h3>
                <p>Popular now</p>
              </div>

              <div
                className={`quick-card ${selectedCategory === "chill" ? "active" : ""}`}
                onClick={() => loadCategory("chill")}
              >
                <div className="emoji">🎧</div>
                <h3>Chill Mix</h3>
                <p>Relax &amp; Enjoy</p>
              </div>

              <div
                className={`quick-card ${selectedCategory === "new" ? "active" : ""}`}
                onClick={() => loadCategory("new")}
              >
                <div className="emoji">🚀</div>
                <h3>New Releases</h3>
                <p>Fresh music</p>
              </div>

            </section>
          </>
        )}

        {/* No Results */}

        {!loading && isSearching && displaySongs.length === 0 && (
          <div className="no-results">
            <h2>No Songs Found 😔</h2>
            <p>Try another search.</p>
          </div>
        )}

        {/* Songs */}

        {loading ? (
          <div className="songs-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <SongSkeleton key={i} />
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
                <button
                  className="see-all"
                  onClick={() =>
                    navigate(`/category/${encodeURIComponent(selectedCategory)}`)
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
                <span className="section-tag">History</span>
                <h2>🕒 Recently Played</h2>
              </div>
            </div>

            <div className="songs-grid">

              {recentSongs.map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  index={index}
                  playlist={recentSongs}
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