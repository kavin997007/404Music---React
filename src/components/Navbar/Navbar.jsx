import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/favicon.png'
import { ThemeContext } from "../../context/ThemeContext";
import {
  FaSearch,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {

  const { 
    search, 
    setSearch,
    setSubmittedSearch,
   } = useContext(MusicContext);

   const { theme, toggleTheme } = useContext(ThemeContext);

   const navigate = useNavigate();


   const handleSearch = () => {
      setSubmittedSearch(search.trim());
    };

  return (
    <header className="navbar">

      {/* Logo */}

      <div className="logo">
        <div className="logo-icon">
          {/* <IoMusicalNotes /> */}
          <img src={logo} alt="logo" />
        </div>

        <h2>404Music</h2>
      </div>

      {/* Search */}

      <div className="search-box">
        <input
          type="text"
          placeholder="Search songs, artists..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <FaSearch className="search-icon" onClick={handleSearch} />

      </div>

      {/* Right */}

      <div className="nav-actions">

        {/* <button
            className="glass-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
        >
            {theme === "dark"
                ? <FaSun/>
                : <FaMoon/>
            }
        </button> */}

        {/* <button className="glass-btn">
          <FaBell/>
        </button> */}

        <div
            className="profile"
            onClick={() => navigate("/profile")}
        >
            <FaUserCircle />
            <span>Profile</span>
        </div>

      </div>

    </header>
  );

};

export default Navbar;