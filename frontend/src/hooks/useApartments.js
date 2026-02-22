// frontend/src/hooks/useApartments.js

import { useQuery } from "@tanstack/react-query";
import { fetchApartmentsInPolygon } from "../api/mapCall";

/**
 * Fetches apartments within the sweet spot polygon.
 * Set enabled=true to auto-fetch, or use refetch() for manual trigger.
 */
export function useApartments(polygon, enabled = false) {
  return useQuery({
    queryKey: ["apartments", polygon],
    queryFn: () => fetchApartmentsInPolygon(polygon),
    enabled: !!polygon && enabled,
    staleTime: 1000 * 60 * 5,
  });
}
