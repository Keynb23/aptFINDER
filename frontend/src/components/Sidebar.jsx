import { useState } from "react";
import { useCommuteStore } from "../store/useCommuteStore";
import { useCommuteLogic } from "../hooks/useIsochrones";
import { MapPin, Info, RefreshCw, Layers, User } from "lucide-react";
import AddressSearch from "./AddressSearch";
import {
  Slider,
  SliderTrack,
  SliderThumb,
  Label,
  SliderOutput,
} from "react-aria-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const {
    workA,
    workB,
    setTargetTimeA,
    setTargetTimeB,
    setWorkA,
    setWorkB,
    reset,
  } = useCommuteStore();

  const { error } = useCommuteLogic();

  const [localA, setLocalA] = useState(workA.targetTime);
  const [localB, setLocalB] = useState(workB.targetTime);

  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="flex flex-col h-screen w-80 lg:w-96 bg-slate-50/80 dark:bg-zinc-950/80 backdrop-blur-xl border-r border-slate-200 dark:border-zinc-800 z-40 relative shadow-2xl"
    >
      {/* Header */}
      <div className="p-8 pb-6">
        <Link
          to="/"
          className="flex items-center gap-3 mb-4 group pointer-events-auto"
        >
          <div className="p-2 bg-emerald-500 dark:bg-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
            <Layers className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-none mb-1">
              AptFinder
            </h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-zinc-500">
              Commute Sweet Spot
            </p>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-4 space-y-12">
        {/* Person 1 Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <User size={16} />
            </div>
            <h3 className="text-sm font-bold text-slate-700 dark:text-zinc-300">
              Person 1 Location
            </h3>
          </div>

          <AddressSearch
            onSelect={setWorkA}
            placeholder="Search address or job..."
            defaultValue={workA.address}
          />

          <CustomSlider
            label="Max Commute Time"
            value={localA}
            onChange={setLocalA}
            onChangeEnd={setTargetTimeA}
            colorClass="bg-indigo-500 dark:bg-indigo-600"
          />
        </div>

        {/* Person 2 Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <User size={16} />
            </div>
            <h3 className="text-sm font-bold text-slate-700 dark:text-zinc-300">
              Person 2 Location
            </h3>
          </div>

          <AddressSearch
            onSelect={setWorkB}
            placeholder="Search address or job..."
            defaultValue={workB.address}
          />

          <CustomSlider
            label="Max Commute Time"
            value={localB}
            onChange={setLocalB}
            onChangeEnd={setTargetTimeB}
            colorClass="bg-violet-500 dark:bg-violet-600"
          />
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 bg-white/40 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 rounded-2xl flex gap-3 shadow-sm"
        >
          <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
              The sweet spot?
            </h3>
            <p className="text-[13px] text-slate-500 dark:text-zinc-400 leading-relaxed">
              Define where you both work. The zone on the map shows area
              reachable by both within the limits.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-8 border-t border-slate-200/60 dark:border-zinc-800/60 bg-slate-50/50 dark:bg-zinc-950/50">
        <button
          onClick={reset}
          className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-slate-50 dark:text-slate-900 text-white rounded-xl font-bold text-sm transition-all hover:bg-slate-800 dark:hover:bg-slate-200 active:scale-[0.98] shadow-lg shadow-slate-900/10 dark:shadow-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <RefreshCw size={16} />
          Clear All
        </button>
      </div>
    </motion.aside>
  );
}

function CustomSlider({
  label,
  value,
  onChange,
  onChangeEnd,
  colorClass = "bg-blue-500 dark:bg-blue-600",
}) {
  return (
    <Slider
      value={value}
      onChange={onChange}
      onChangeEnd={onChangeEnd}
      minValue={5}
      maxValue={60}
      step={5}
      className="flex flex-col gap-4 w-full"
    >
      <div className="flex justify-between items-end px-1">
        <Label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
          {label}
        </Label>
        <SliderOutput className="text-xs font-mono font-bold bg-slate-200 dark:bg-zinc-800 px-2 py-1 rounded text-slate-600 dark:text-zinc-400">
          {value} min
        </SliderOutput>
      </div>
      <SliderTrack className="relative w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-full">
        {({ state }) => (
          <>
            <div
              className={`absolute h-full ${colorClass} rounded-full transition-all duration-150`}
              style={{ width: `${state.getThumbPercent(0) * 100}%` }}
            />
            <SliderThumb className="w-5 h-5 bg-white dark:bg-zinc-100 border-2 border-slate-900 dark:border-white rounded-full shadow-md cursor-grab active:cursor-grabbing focus:ring-4 focus:ring-blue-500/20 outline-none transition-shadow" />
          </>
        )}
      </SliderTrack>
    </Slider>
  );
}
