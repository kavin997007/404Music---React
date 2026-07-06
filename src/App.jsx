import { Routes, Route } from "react-router-dom";

import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Library from "./pages/Library/Library";
import Playlist from "./pages/Playlist/Playlist";
import Favorites from "./pages/Favorites/Favorites";
import RecentlyPlayed from "./pages/RecentlyPlayed/RecentlyPlayed";
import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";
import Category from "./pages/Category/Category";
import Profile from "./pages/Profile/Profile";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import YoutubePlayer from "./components/MusicPlayer/YoutubePlayer";

import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  useKeyboardShortcuts();

  return (
    <>
      <YoutubePlayer />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />

        <Route
          path="/library"
          element={
            <PrivateRoute>
              <Library />
            </PrivateRoute>
          }
        />

        <Route
          path="/playlist"
          element={
            <PrivateRoute>
              <Playlist />
            </PrivateRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />

        <Route
          path="/recently-played"
          element={
            <PrivateRoute>
              <RecentlyPlayed />
            </PrivateRoute>
          }
        />

        <Route
          path="/playlist/:id"
          element={
            <PrivateRoute>
              <PlaylistPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/category/:name"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;