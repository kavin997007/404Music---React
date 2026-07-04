import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MusicContext } from "../../context/MusicContext";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import SongCard from "../../components/SongCard/SongCard";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

import "./PlaylistPage.css";


const PlaylistPage = () => {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const {
    playlists,
    removeSongFromPlaylist,
    renamePlaylist,
    deletePlaylist,
    } = useContext(MusicContext);

  const playlist = playlists.find(
    (item) => item.id === id
  );

  if (!playlist) {
    return (
      <MainLayout>
        <h2>Playlist not found</h2>
      </MainLayout>
    );
  }

    const handleDeleteSong = (songId) => {
    removeSongFromPlaylist(id, songId);

    toast.success("Song removed from playlist");
    };

    const handleRenamePlaylist = () => {
    const newName = prompt(
        "Enter new playlist name",
        playlist.name
    );

    if (!newName || !newName.trim()) return;

    renamePlaylist(id, newName.trim());

    toast.success("Playlist renamed!");
    };
    
    const handleDeletePlaylist = () => {
    const confirmDelete = window.confirm(
        `Delete "${playlist.name}"?`
    );

    if (!confirmDelete) return;

    deletePlaylist(id);

    toast.success("Playlist deleted!");

    navigate("/");
    };

  return (
    <MainLayout>

        <div className="playlist-page">

        {/* HERO */}

        <section className="playlist-hero">

            <div className="playlist-cover">

            <div className="cover-circle">
                🎵
            </div>

            </div>

            <div className="playlist-details">

            <span className="playlist-type">
                YOUR PLAYLIST
            </span>

            <h1>{playlist.name}</h1>

            <p>

                {playlist.songs.length}
                {playlist.songs.length === 1
                ? " Song"
                : " Songs"}

            </p>

            <div className="playlist-actions">

                <button
                className="rename-btn"
                onClick={handleRenamePlaylist}
                >
                <FaEdit />
                Rename
                </button>

                {playlist.name !== "My Playlist" && (

                <button
                    className="delete-btn"
                    onClick={handleDeletePlaylist}
                >
                    <FaTrash />
                    Delete
                </button>

                )}

            </div>

            </div>

        </section>

        {/* SONGS */}

        {playlist.songs.length === 0 ? (

            <div className="empty-playlist">

            <div className="empty-icon">
                🎧
            </div>

            <h2>No Songs Yet</h2>

            <p>
                Add songs from Home to build your playlist.
            </p>

            </div>

        ) : (

            <div className="playlist-grid">

            {playlist.songs.map((song, index) => (

                <div
                className="playlist-card"
                key={song.id}
                >

                <SongCard
                    song={song}
                    index={index}
                />

                <button
                    className="delete-song-btn"
                    onClick={() =>
                    handleDeleteSong(song.id)
                    }
                >
                    <FaTrash />
                </button>

                </div>

            ))}

            </div>

        )}

        </div>

    </MainLayout>
    );
};

export default PlaylistPage;