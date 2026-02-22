import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function AddressSearch({
  onSelect,
  placeholder,
  defaultValue = "",
}) {
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (value) => {
    setQuery(value);
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          value
        )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`
      );
      const data = await response.json();
      setSuggestions(data.features || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Geocoding error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (feature) => {
    setQuery(feature.place_name);
    setShowSuggestions(false);
    onSelect({
      address: feature.place_name,
      coords: feature.geometry.coordinates,
    });
  };

  return (
    <div ref={containerRef} className="relative w-full group">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 3 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm group-hover:border-slate-300 dark:group-hover:border-zinc-700 font-medium"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 w-4 h-4" />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setSuggestions([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
          >
            {suggestions.map((feature) => (
              <li
                key={feature.id}
                onClick={() => handleSelect(feature)}
                className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer border-b border-slate-100 dark:border-zinc-800/50 last:border-none transition-colors"
              >
                <p className="text-sm font-bold text-slate-700 dark:text-zinc-200 truncate">
                  {feature.text}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-zinc-500 truncate mt-0.5">
                  {feature.place_name}
                </p>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
