import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Player from "../../components/Player/Player";
import Queue from "../../components/Queue/Queue";
import FullScreenPlayer from "../../components/FullScreenPlayer/FullScreenPlayer";

import "./MainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        <main className="content">
          {children}
        </main>

        <div className="player-wrapper">
          <Player />
        </div>
      </div>

      <Queue />
      <FullScreenPlayer />
    </div>
  );
};

export default MainLayout;