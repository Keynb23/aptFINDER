// frontend/src/hooks/useIsochrones.js
import { useQuery } from "@tanstack/react-query";
import * as turf from "@turf/turf";
import { useCommuteStore } from "../store/useCommuteStore";

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

/**
 * Fetches an isochrone polygon from Mapbox API.
 * @param {Array<number>} coords [lng, lat]
 * @param {number} minutes Commute time in minutes
 * @returns {Promise<Object>} GeoJSON Polygon
 */
async function fetchIsochrone(coords, minutes) {
  const url = `https://api.mapbox.com/isochrone/v1/mapbox/driving/${coords[0]},${coords[1]}?contours_minutes=${minutes}&polygons=true&access_token=${MAPBOX_ACCESS_TOKEN}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch isochrone");
  const data = await response.json();
  return data.features[0];
}

/**
 * Hook to manage isochrone data and intersection logic.
 */
export function useCommuteLogic() {
  const { workA, workB } = useCommuteStore();

  const queryA = useQuery({
    queryKey: ["isochrone", "workA", workA.coords, workA.targetTime],
    queryFn: () => fetchIsochrone(workA.coords, workA.targetTime),
    enabled: !!workA.coords,
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  const queryB = useQuery({
    queryKey: ["isochrone", "workB", workB.coords, workB.targetTime],
    queryFn: () => fetchIsochrone(workB.coords, workB.targetTime),
    enabled: !!workB.coords,
    staleTime: 1000 * 60 * 5,
  });

  /**
   * Calculates the intersection of two isochrones.
   * Uses turf.intersect to find the overlapping polygon.
   */
  const sweetSpot = (() => {
    if (!queryA.data || !queryB.data) return null;

    try {
      // Turf 7.x intersect takes features/geometries directly
      const intersection = turf.intersect(
        turf.featureCollection([queryA.data, queryB.data])
      );
      return intersection;
    } catch (err) {
      console.warn("Spatial intersection failed:", err);
      return null;
    }
  })();

  return {
    isochroneA: queryA.data,
    isochroneB: queryB.data,
    sweetSpot,
    isLoading: queryA.isLoading || queryB.isLoading,
    error: queryA.error || queryB.error,
  };
}
