import { NavLink } from "react-router-dom";
import { FaHome, FaHeart, FaHistory,FaUser } from "react-icons/fa";

import "./BottomNavigation.css";

const BottomNavigation = () => {
  return (
    <nav className="bottom-navigation">

      <NavLink to="/">
        <FaHome />
        <span>Home</span>
      </NavLink>

      <NavLink to="/favorites">
        <FaHeart />
        <span>Liked</span>
      </NavLink>

      <NavLink to="/recently-played">
        <FaHistory />
        <span>Recent</span>
      </NavLink>

      <NavLink to="/profile">
          <FaUser />
          <span>Profile</span>
      </NavLink>

    </nav>
  );
};

export default BottomNavigation;