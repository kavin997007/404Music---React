import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MusicContext } from "../../context/MusicContext";

import {
  FaHome,
  FaHeart,
  FaHistory,
  FaPlus,
  FaMusic,
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = () => {
  const { playlists, setPlaylists } = useContext(MusicContext);

  const handleCreatePlaylist = () => {
    const name = prompt("Enter playlist name");

    if (!name?.trim()) return;

    setPlaylists([
      ...playlists,
      {
        id: Date.now().toString(),
        name: name.trim(),
        songs: [],
      },
    ]);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">

        {/* Logo */}

        <div className="sidebar-logo">
          <div className="logo-circle">
            <FaMusic />
          </div>

          <div className="logo-text">
            <h2>404Music</h2>
            <small>Feel Every Beat</small>
          </div>
        </div>

        {/* Menu */}

        <nav className="sidebar-menu">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FaHome />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FaHeart />
            <span>Liked Songs</span>
          </NavLink>

          <NavLink
            to="/recently-played"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <FaHistory />
            <span>Recently Played</span>
          </NavLink>
        </nav>
      </div>

      {/* Playlist */}

      <div className="playlist-section">

        <div className="playlist-header">
          <h3>Your Playlists</h3>

          <button
            className="create-playlist"
            onClick={handleCreatePlaylist}
          >
            <FaPlus />
            <span>Create</span>
          </button>
        </div>

        <div className="playlist-list">
          {playlists.map((playlist) => (
            <NavLink
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="playlist-card"
            >
              🎵 {playlist.name}
            </NavLink>
          ))}
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;