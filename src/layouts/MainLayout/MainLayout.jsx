import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Player from "../../components/Player/Player";
import Queue from "../../components/Queue/Queue";
import FullScreenPlayer from "../../components/FullScreenPlayer/FullScreenPlayer";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";

import "./MainLayout.css";

const MainLayout = ({ children }) => {

  const { currentSong } = useContext(MusicContext);

  return (
    <div className="layout">

      <Sidebar />

      <div className="main">

        <Navbar />

        <main className="content">
          {children}
        </main>

        {currentSong && (
          <div className="player-wrapper">
            <Player />
          </div>
        )}

      </div>

      <Queue />

      <FullScreenPlayer />

      <BottomNavigation />

    </div>
  );
};

export default MainLayout;