// Central place for the backend API base URL.
//
// In development, Vite reads Frontend/.env and falls back to your local
// backend (http://localhost:5000) if VITE_API_URL isn't set.
// In production (Vercel), set VITE_API_URL as an Environment Variable in
// the Vercel project settings so the deployed site talks to the deployed
// backend instead of localhost.
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

// Helper for building image URLs. Product/avatar images are now stored as
// base64 data URIs straight from MongoDB, so most of the time you can just
// use the value directly - this only adds the API prefix for the rare
// legacy value that is still a bare filename instead of a data: URI.
export const resolveImageUrl = (image) => {
  if (!image) return '';
  if (image.startsWith('data:') || image.startsWith('http')) return image;
  return `${API_BASE_URL}/images/${image}`;
};
