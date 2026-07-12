/**
 * Detects if a URL or filename points to a video asset
 */
export const isVideo = (url) => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.m4v', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };