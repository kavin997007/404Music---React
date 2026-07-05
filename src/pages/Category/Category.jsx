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
    } = useContext(MusicContext);

    const [songs, setSongs] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadSongs = async () => {

            try {

                setLoading(true);

                if (name === "liked") {

                    setSongs(favorites);

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

                if (name === "trending") {

                    const data =
                        await getTrendingMusic();

                    setSongs(
                        data.map(normalizeSong)
                    );

                } else {

                    const data =
                        await searchMusic(query);

                    setSongs(
                        data.map(normalizeSong)
                    );

                }

            }

            finally {

                setLoading(false);

            }

        };

        loadSongs();

    }, [name, favorites]);

    return (

        <MainLayout>

            <div className="category-page">

                <h1>
                    {decodeURIComponent(name)}
                </h1>

                <p>
                    {songs.length} Songs
                </p>

                <div className="songs-grid">

                    {
                        songs.map((song, index) => (

                            <SongCard
                                key={song.id}
                                song={song}
                                index={index}
                            />

                        ))
                    }

                </div>

            </div>

        </MainLayout>

    );

};

export default Category;