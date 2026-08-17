import React from "react";
import { BookOpen, Calendar, Sparkles, Heart, Volume2, VolumeX, Maximize2, TreePine } from "lucide-react";

interface HeaderProps {
  activeTab: "today" | "week" | "ai" | "favorites" | "sounds";
  setActiveTab: (tab: "today" | "week" | "ai" | "favorites" | "sounds") => void;
  favoritesCount: number;
  isAudioPlaying: boolean;
  toggleAudio: () => void;
  openImmersive: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  isAudioPlaying,
  toggleAudio,
  openImmersive,
}) => {
  // Format current date in Portuguese
  const todayDateStr = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Capitalize first letter of weekday
  const formattedDate = todayDateStr.charAt(0).toUpperCase() + todayDateStr.slice(1);

  return (
    <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo and Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("today")}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center shadow-md border border-emerald-500/30">
                <TreePine className="w-6 h-6 text-emerald-100" />
              </div>
              <div>
                <h1 className="text-lg font-serif font-bold tracking-tight text-amber-100 flex items-center gap-2">
                  Palavra Diária <span className="text-xs font-sans font-normal px-2 py-0.5 rounded-full bg-amber-900/50 text-amber-300 border border-amber-700/40">Bíblia ARA</span>
                </h1>
                <p className="text-xs text-stone-400 capitalize">{formattedDate}</p>
              </div>
            </div>

            {/* Mobile quick actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-lg text-xs font-medium transition ${
                  isAudioPlaying
                    ? "bg-emerald-600 text-white animate-pulse"
                    : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                }`}
                title="Sons da Natureza"
              >
                {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={openImmersive}
                className="p-2 rounded-lg bg-stone-800 text-amber-200 hover:bg-stone-700"
                title="Modo Imersivo"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab("today")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                activeTab === "today"
                  ? "bg-amber-700/80 text-amber-50 border border-amber-500/40 shadow"
                  : "text-stone-300 hover:bg-stone-800 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              Palavra de Hoje
            </button>

            <button
              onClick={() => setActiveTab("week")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                activeTab === "week"
                  ? "bg-amber-700/80 text-amber-50 border border-amber-500/40 shadow"
                  : "text-stone-300 hover:bg-stone-800 hover:text-white"
              }`}
            >
              <Calendar className="w-4 h-4 text-teal-400" />
              Dias da Semana
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                activeTab === "ai"
                  ? "bg-emerald-700/80 text-emerald-50 border border-emerald-500/40 shadow"
                  : "text-emerald-300 hover:bg-stone-800 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              Reflexão IA
            </button>

            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap relative ${
                activeTab === "favorites"
                  ? "bg-amber-700/80 text-amber-50 border border-amber-500/40 shadow"
                  : "text-stone-300 hover:bg-stone-800 hover:text-white"
              }`}
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400/30" />
              Favoritos
              {favoritesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-rose-600 text-white text-[10px] rounded-full font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("sounds")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                activeTab === "sounds"
                  ? "bg-teal-700/80 text-teal-50 border border-teal-500/40 shadow"
                  : "text-stone-300 hover:bg-stone-800 hover:text-white"
              }`}
            >
              <Volume2 className="w-4 h-4 text-cyan-400" />
              Ambiente
            </button>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                isAudioPlaying
                  ? "bg-emerald-600/90 text-white border-emerald-400 animate-pulse shadow-md"
                  : "bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700"
              }`}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              {isAudioPlaying ? "Sons Ligados" : "Sons da Natureza"}
            </button>

            <button
              onClick={openImmersive}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-900/40 border border-amber-700/50 text-amber-200 hover:bg-amber-800/60 transition"
              title="Tela Cheia para Meditação"
            >
              <Maximize2 className="w-4 h-4" />
              Imersivo
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
