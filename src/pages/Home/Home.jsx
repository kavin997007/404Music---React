import { useContext, useEffect, useState } from "react";
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
    searchResults,
    setSearchResults,
    setPlaylist,
    setQueue,
    recentSongs,
    favorites,
  } = useContext(MusicContext);

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===========================
      Trending Songs
  =========================== */

  useEffect(() => {

    const fetchSongs = async () => {

      try {

        setLoading(true);

        const data = await getTrendingMusic();

        const normalized = data.map(normalizeSong);

        setSongs(normalized);

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

    const timer = setTimeout(async () => {

      if (!search.trim()) {

        setSearchResults([]);

        return;

      }

      try {

        setLoading(true);

        const data = await searchMusic(search);

        const normalized = data.map(normalizeSong);

        setSearchResults(normalized);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    }, 500);

    return () => clearTimeout(timer);

  }, [search, setSearchResults]);

  /* ===========================
      Display Songs
  =========================== */

  const displaySongs =
    search.trim() !== ""
      ? searchResults
      : songs;

  /* ===========================
      Playlist + Queue
  =========================== */

  useEffect(() => {

    setPlaylist(displaySongs);

    setQueue(displaySongs);

  }, [displaySongs]);

  return (

    <MainLayout>

      <div className="home">

        {/* =======================================
                  HERO SECTION
        ======================================= */}

        <section className="hero">

          <div className="hero-content">

            <span className="hero-badge">
              Welcome Back 👋
            </span>

            <h1>

              {
                new Date().getHours() < 12
                  ? "Good Morning ☀️"
                  : new Date().getHours() < 18
                  ? "Good Afternoon 🌤️"
                  : "Good Evening 🌙"
              }

            </h1>

            <p>
              Discover trending music and enjoy your favorite songs anytime.
            </p>

            <button className="hero-btn">
              ▶ Play Trending
            </button>

          </div>

        </section>

        {/* =======================================
                  QUICK ACTIONS
        ======================================= */}

        <section className="quick-grid">

          <div className="quick-card">
            <div className="emoji">❤️</div>
            <h3>Liked Songs</h3>
            <p>Your favorites</p>
          </div>

          <div className="quick-card">
            <div className="emoji">🔥</div>
            <h3>Trending</h3>
            <p>Popular now</p>
          </div>

          <div className="quick-card">
            <div className="emoji">🎧</div>
            <h3>Chill Mix</h3>
            <p>Relax & Enjoy</p>
          </div>

          <div className="quick-card">
            <div className="emoji">🚀</div>
            <h3>New Releases</h3>
            <p>Fresh music</p>
          </div>

        </section>

        {/* =======================================
                  NO RESULTS
        ======================================= */}

        {
          !loading &&
          search.trim() &&
          displaySongs.length === 0 && (

            <div className="no-results">

              <h2>No Songs Found 😔</h2>

              <p>
                Try searching another artist or song.
              </p>

            </div>

          )
        }

        {/* =======================================
                  TRENDING MUSIC
        ======================================= */}

        {
          loading ? (

            <div className="songs-grid">

              {
                Array.from({ length: 12 }).map((_, index) => (

                  <SongSkeleton key={index} />

                ))
              }

            </div>

          ) : (

            <section className="music-section">

              <div className="section-title">

                <div>

                  <span className="section-tag">
                    Trending
                  </span>

                  <h2>🔥 Trending Music</h2>

                </div>

                <button className="see-all">
                  See All
                </button>

              </div>

              <div className="songs-grid">

                {
                  displaySongs.map((song, index) => (

                    <SongCard
                      key={song.id}
                      song={song}
                      index={index}
                      playlist={songs}
                    />

                  ))
                }

              </div>

            </section>

          )
        }

        {/* =======================================
              RECENTLY PLAYED
        ======================================= */}

        {
          recentSongs.length > 0 && (

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

                {
                  recentSongs.map((song, index) => (

                    <SongCard
                      key={`recent-${song.id}`}
                      song={song}
                      index={index}
                      playlist={recentSongs}
                    />

                  ))
                }

              </div>

            </section>

          )
        }

      </div>

    </MainLayout>

  );

};

export default Home;