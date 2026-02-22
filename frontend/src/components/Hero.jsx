import { motion } from "framer-motion";
import { MapPin, ArrowDown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 px-6 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
          <Sparkles size={12} />
          <span>Spatial Analysis Tool</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-zinc-50 tracking-tighter mb-6 leading-[1.1]">
          Find your <span className="text-emerald-500">Sweet Spot.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          The perfect home isn&apos;t just about the yard. It&apos;s about the
          commute. AptFinder helps you find the overlapping area that keeps
          everyone happy.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/app")}
            className="px-8 py-4 bg-slate-900 dark:bg-zinc-50 text-white dark:text-slate-900 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20 dark:shadow-none"
          >
            Start Searching
          </button>
        </div>
      </motion.div>
    </section>
  );
}
