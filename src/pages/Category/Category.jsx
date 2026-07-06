import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import SongCard from "../../components/SongCard/SongCard";
import SongSkeleton from "../../components/Skeleton/SongSkeleton";

import {
    MusicContext,
} from "../../context/MusicContext";

import {
    getTrendingMusic,
    searchMusic,
} from "../../services/youtube";

import {
    normalizeSong,
} from "../../utils/normalizeSong";

import "./Category.css";

const Category = () => {

    const { name } = useParams();

    const {
        favorites,
        setPlaylist,
        setQueue,
        setCurrentSource,
    } = useContext(MusicContext);

    const [songs, setSongs] = useState([]);

    const [loading, setLoading] = useState(true);

    const displaySongs = name === "liked" ? favorites : songs;

    useEffect(() => {

        const loadSongs = async () => {

            try {

                setLoading(true);

                if (name === "liked") {

                    setPlaylist(favorites);
                    setQueue(favorites);
                    setCurrentSource({ type: "liked", query: "" });

                    return;

                }

                let query = "";

                switch (name) {

                    case "trending":
                        query = "";
                        break;

                    case "Chill Mix":
                        query = "Chill Mix";
                        break;

                    case "New Songs 2026":
                        query = "New Songs 2026";
                        break;

                    default:
                        query = name;

                }

                let normalized = [];

                if (name === "trending") {

                    const data =
                        await getTrendingMusic();

                    normalized = data.map(normalizeSong);

                } else {

                    const data =
                        await searchMusic(query);

                    normalized = data.map(normalizeSong);

                }

                setSongs(normalized);
                setPlaylist(normalized);
                setQueue(normalized);
                setCurrentSource({ type: "category", query: name });

            }

            finally {

                setLoading(false);

            }

        };

        loadSongs();

    }, [name]);

    return (

        <MainLayout>

            <div className="category-page">

                <h1>
                    {decodeURIComponent(name)}
                </h1>

                <p>
                    {displaySongs.length} Songs
                </p>

                {loading ? (
                    <div className="songs-grid">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <SongSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="songs-grid">

                        {
                            displaySongs.map((song, index) => (

                                <SongCard
                                    key={song.id}
                                    song={song}
                                    index={index}
                                    playlist={displaySongs}
                                />

                            ))
                        }

                    </div>
                )}

            </div>

        </MainLayout>

    );

};

export default Category;