// frontend/src/api/mapCall.js

const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

/**
 * Fetches apartments/listings from the backend API within a GeoJSON polygon.
 * @param {Object} polygon GeoJSON polygon (e.g. sweet spot intersection)
 * @param {Object} options Optional filters (minPrice, maxPrice, etc.)
 * @returns {Promise<Object>} API response with listings
 */
export async function fetchApartmentsInPolygon(polygon, options = {}) {
  const response = await fetch(`${API_BASE}/listings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ polygon, ...options }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message ?? `API error: ${response.status}`);
  }

  return response.json();
}
