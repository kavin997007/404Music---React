import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Trending Music
export const getTrendingMusic = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/videos`, {
      params: {
        key: API_KEY,
        part: "snippet",
        chart: "mostPopular",
        videoCategoryId: "10",
        regionCode: "IN",
        maxResults: 20,
      },
    });

    return data.items;
  } catch (error) {
    console.error("Trending Error:", error.response?.data || error.message);
    return [];
  }
};

// Search Music
export const searchMusic = async (query) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: API_KEY,
        part: "snippet",
        q: query,
        type: "video",
        videoCategoryId: "10",
        maxResults: 20,
      },
    });

    return data.items;
  } catch (error) {
    console.error("Search Error:", error.response?.data || error.message);
    return [];
  }
};

// More Songs

export const fetchMoreSongs = async (source) => {
  let query;

  switch (source.type) {
    case "search":
      query = `${source.query} songs`;
      break;

    case "category":
      query = `${source.query} playlist`;
      break;

    case "trending":
      return await getTrendingMusic();

    case "liked":
      return await getTrendingMusic();

    default:
      query = source.query || "Top Music";
  }

  return await searchMusic(query);
};