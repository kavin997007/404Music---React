import React from 'react';
import {Routes,Route} from 'react-router-dom';
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Library from './pages/Library/Library';
import Playlist from './pages/Playlist/Playlist';
import Favorites from "./pages/Favorites/Favorites";
import RecentlyPlayed from "./pages/RecentlyPlayed/RecentlyPlayed";
import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";
import YoutubePlayer from "./components/MusicPlayer/YoutubePlayer";

const App = () => {

  useKeyboardShortcuts();

  return (
    <div>
      <YoutubePlayer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/library' element={<Library/>}/>
        <Route path='/playlist' element={<Playlist/>}/>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recently-played" element={<RecentlyPlayed />} />
        <Route path="/playlist/:id" element={<PlaylistPage />}
      />
      </Routes>
    </div>
  )
}

export default App;
