import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CommuteMap from "./components/Map";
import Hero from "./components/Hero";
import { useTheme } from "./hooks/useTheme";
import { Moon, Sun } from "lucide-react";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="w-full min-h-screen bg-white dark:bg-zinc-950 font-sans tracking-tight overflow-x-hidden">
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<Hero />} />

          {/* Main App Route */}
          <Route
            path="/app"
            element={
              <div className="flex h-screen w-screen overflow-hidden">
                <Sidebar />
                <main className="flex-1 relative overflow-hidden">
                  <CommuteMap theme={theme} />

                  {/* Floating Controls */}
                  <div className="absolute top-6 right-6 flex flex-col gap-3 z-30">
                    <button
                      onClick={toggleTheme}
                      className="p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 group focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label="Toggle theme"
                    >
                      {theme === "light" ? (
                        <Moon className="w-5 h-5 text-slate-700 group-hover:text-blue-600 transition-colors" />
                      ) : (
                        <Sun className="w-5 h-5 text-zinc-300 group-hover:text-yellow-400 transition-colors" />
                      )}
                    </button>
                  </div>
                </main>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
