import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
    signOut,
} from "firebase/auth";

import { auth } from "../../Firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { MusicContext } from "../../context/MusicContext";

import MainLayout from "../../layouts/MainLayout/MainLayout";

import {
    FaHeart,
    FaHistory,
    FaMusic,
    FaSignOutAlt,
} from "react-icons/fa";

import "./Profile.css";

const Profile = () => {

    const navigate = useNavigate();

    const { user } = useAuth();

    const {

        favorites,
        playlists,
        recentSongs,

    } = useContext(MusicContext);

    const logout = async () => {
        await signOut(auth);
        navigate("/login", {
            replace: true,
        });
    };

    return (
        <MainLayout>
            <div className="profile-page">
                <div className="profile-card">
                    <img
                        src={
                            user.photoURL ||
                            "https://ui-avatars.com/api/?name=" +
                            user.displayName
                        }
                        alt=""
                    />
                    <h2>
                        {user.displayName}
                    </h2>
                    <p>
                        {user.email}
                    </p>
                    <small>
                        Member
                    </small>
                </div>
                <div className="profile-stats">
                    <div className="stat">
                        <FaHeart />
                        <h2>
                            {favorites.length}
                        </h2>
                        <span>
                            Liked Songs
                        </span>
                    </div>
                    <div className="stat">
                        <FaMusic />
                        <h2>
                            {playlists.length}
                        </h2>
                        <span>
                            Playlists
                        </span>
                    </div>
                    <div className="stat">
                        <FaHistory />
                        <h2>
                            {recentSongs.length}
                        </h2>
                        <span>
                            Recent
                        </span>
                    </div>
                </div>
                <div className="profile-actions">
                    {/* <button>
                        <FaUserEdit />
                        Edit Profile
                    </button> */}
                    {/* <button>
                        <FaCamera />
                        Change Photo
                    </button> */}
                    {/* <button>
                        <FaMoon />
                        Theme
                    </button> */}
                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </div>
        </MainLayout>
    );
};

export default Profile;