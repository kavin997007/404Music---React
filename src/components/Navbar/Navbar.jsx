import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";
import { IoMusicalNotes } from "react-icons/io5";

import {
  FaSearch,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {

  const { search, setSearch } = useContext(MusicContext);

  return (
    <header className="navbar">

      {/* Logo */}

      <div className="logo">
        <div className="logo-icon">
          <IoMusicalNotes />
        </div>

        <h2>404Music</h2>
      </div>

      {/* Search */}

      <div className="search-box">

        <FaSearch className="search-icon"/>

        <input
          type="text"
          placeholder="Search songs, artists..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      {/* Right */}

      <div className="nav-actions">

        <button className="glass-btn">
          <FaBell/>
        </button>

        <div className="profile">

          <FaUserCircle/>

          <span>Profile</span>

        </div>

      </div>

    </header>
  );

};

export default Navbar;