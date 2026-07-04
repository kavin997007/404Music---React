export const normalizeSong = (item) => {
  return {
    id:
      typeof item.id === "object"
        ? item.id.videoId
        : item.id,

    title: item.snippet.title,

    artist: item.snippet.channelTitle,

    thumbnail:
      item.snippet.thumbnails.high?.url ||
      item.snippet.thumbnails.medium?.url ||
      item.snippet.thumbnails.default?.url,
  };
};