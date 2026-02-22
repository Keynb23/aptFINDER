import { useRef, useEffect, useMemo } from "react";
import Map, {
  Source,
  Layer,
  NavigationControl,
  Marker,
} from "react-map-gl/mapbox";
import { useCommuteLogic } from "../hooks/useIsochrones";
import { useCommuteStore } from "../store/useCommuteStore";
import { Maximize2, MapPin } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function CommuteMap({ theme }) {
  const { sweetSpot } = useCommuteLogic();
  const { workA, workB, currentHome } = useCommuteStore();
  const mapRef = useRef(null);

  const initialViewState = {
    longitude: -94.6905,
    latitude: 38.9439,
    zoom: 10,
    pitch: 0,
    bearing: 0,
  };

  const colors = useMemo(() => {
    return theme === "dark"
      ? { fill: "#2dd4bf", outline: "#0d9488", opacity: 0.3 } // Teal/Cyan for Dark
      : { fill: "#10b981", outline: "#059669", opacity: 0.35 }; // Emerald for Light
  }, [theme]);

  const mapStyle = useMemo(() => {
    return theme === "dark"
      ? "mapbox://styles/mapbox/dark-v11"
      : "mapbox://styles/mapbox/light-v11";
  }, [theme]);

  useEffect(() => {
    if (mapRef.current) {
      const activeCoords = [workA.coords, workB.coords].filter(Boolean);
      if (activeCoords.length > 0) {
        const bounds = [
          [
            Math.min(...activeCoords.map((c) => c[0])) - 0.05,
            Math.min(...activeCoords.map((c) => c[1])) - 0.05,
          ],
          [
            Math.max(...activeCoords.map((c) => c[0])) + 0.05,
            Math.max(...activeCoords.map((c) => c[1])) + 0.05,
          ],
        ];
        mapRef.current.fitBounds(bounds, { padding: 100, duration: 2000 });
      }
    }
  }, [workA.coords, workB.coords]);

  const handleRecenter = () => {
    if (mapRef.current) {
      const activeCoords = [workA.coords, workB.coords].filter(Boolean);
      if (activeCoords.length > 0) {
        const bounds = [
          [
            Math.min(...activeCoords.map((c) => c[0])) - 0.05,
            Math.min(...activeCoords.map((c) => c[1])) - 0.05,
          ],
          [
            Math.max(...activeCoords.map((c) => c[0])) + 0.05,
            Math.max(...activeCoords.map((c) => c[1])) + 0.05,
          ],
        ];
        mapRef.current.fitBounds(bounds, { padding: 100, duration: 2000 });
      } else {
        mapRef.current.flyTo({
          center: [initialViewState.longitude, initialViewState.latitude],
          zoom: initialViewState.zoom,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-100 dark:bg-zinc-900 transition-colors duration-500 font-sans">
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        reuseMaps
      >
        <NavigationControl position="bottom-right" />

        {/* Work A Marker */}
        {workA?.coords && (
          <CustomMarker
            coords={workA.coords}
            name={workA.name}
            colorClass="text-indigo-600 dark:text-indigo-400"
            bgClass="bg-indigo-500/10 dark:bg-indigo-400/10"
            borderClass="border-indigo-200 dark:border-indigo-800"
          />
        )}

        {/* Work B Marker */}
        {workB?.coords && (
          <CustomMarker
            coords={workB.coords}
            name={workB.name}
            colorClass="text-violet-600 dark:text-violet-400"
            bgClass="bg-violet-500/10 dark:bg-violet-400/10"
            borderClass="border-violet-200 dark:border-violet-800"
          />
        )}

        {sweetSpot && (
          <Source type="geojson" data={sweetSpot}>
            <Layer
              id="sweet-spot-fill"
              type="fill"
              paint={{
                "fill-color": colors.fill,
                "fill-opacity": colors.opacity,
              }}
            />
            <Layer
              id="sweet-spot-outline"
              type="line"
              paint={{
                "line-color": colors.outline,
                "line-width": 2,
              }}
            />
          </Source>
        )}
      </Map>

      {/* Recenter Button */}
      {(workA?.coords || workB?.coords) && (
        <div className="absolute bottom-6 left-6 z-30">
          <button
            onClick={handleRecenter}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-slate-200 dark:border-zinc-800 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-95 group focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Maximize2 className="w-4 h-4 text-slate-600 dark:text-zinc-400 group-hover:text-blue-500 transition-colors" />
            <span className="text-sm font-bold text-slate-700 dark:text-zinc-300">
              Recenter
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

function CustomMarker({ coords, name, colorClass, bgClass, borderClass }) {
  return (
    <Marker longitude={coords[0]} latitude={coords[1]} anchor="bottom">
      <div className="flex flex-col items-center group cursor-pointer">
        {/* Label */}
        <div
          className={`mb-1 px-2 py-0.5 rounded-md border backdrop-blur-md shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-1 group-hover:translate-y-0 ${bgClass} ${borderClass}`}
        >
          <span
            className={`text-[10px] font-bold uppercase tracking-wider ${colorClass}`}
          >
            {name}
          </span>
        </div>

        {/* Pin */}
        <div className="relative">
          <div
            className={`absolute inset-0 blur-lg opacity-20 scale-150 ${colorClass.replace("text-", "bg-")}`}
          />
          <MapPin
            size={28}
            className={`${colorClass} fill-current bg-opacity-10 drop-shadow-md transform transition-transform group-hover:scale-110 active:scale-95`}
          />
        </div>

        {/* Static label for permanent identification if needed, but here we use hover as requested or per design */}
        <div
          className={`mt-1 px-1.5 py-0.5 rounded bg-white/80 dark:bg-zinc-900/80 border border-slate-200/50 dark:border-zinc-800/50 shadow-sm transition-opacity ${name === "Work A" ? "block" : "block"}`}
        >
          <span className="text-[9px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-tighter">
            {name}
          </span>
        </div>
      </div>
    </Marker>
  );
}
