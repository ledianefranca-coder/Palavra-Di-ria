import React from "react";
import { BookOpen, Calendar, Sparkles, Heart, Volume2, VolumeX, Maximize2, Sprout } from "lucide-react";
import { InstallAppButton } from "./InstallAppButton";

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
    <header className="sticky top-0 z-40 bg-[#f7f3eb]/92 backdrop-blur-xl border-b border-[#ded5c7] text-[#45463e] shadow-[0_8px_30px_rgba(72,67,54,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo and Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("today")}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667d63] to-[#3f5947] flex items-center justify-center shadow-md border border-[#789176]/40">
                <Sprout className="w-6 h-6 text-[#f4ebd9]" />
              </div>
              <div>
                <h1 className="text-lg font-serif font-bold tracking-tight text-[#504638] flex items-center gap-2">
                  Palavra Diária <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-[#eee2d1] text-[#76583d] border border-[#d8c4a8]">Bíblia ARA</span>
                </h1>
                <p className="text-xs text-[#77736a] capitalize">{formattedDate}</p>
              </div>
            </div>

            {/* Mobile quick actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-lg text-xs font-medium transition ${
                  isAudioPlaying
                    ? "bg-emerald-600 text-white animate-pulse"
                    : "bg-[#ebe6dc] text-[#62635a] hover:bg-[#dfd8cc]"
                }`}
                title="Sons da Natureza"
              >
                {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={openImmersive}
                className="p-2 rounded-lg bg-[#ebe6dc] text-[#76583d] hover:bg-[#dfd8cc]"
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
                  ? "bg-[#76583d] text-white border border-[#8a6747] shadow"
                  : "text-[#62635a] hover:bg-[#ebe6dc] hover:text-[#34362f]"
              }`}
            >
              <BookOpen className="w-4 h-4 text-current" />
              Palavra de Hoje
            </button>

            <button
              onClick={() => setActiveTab("week")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                activeTab === "week"
                  ? "bg-[#76583d] text-white border border-[#8a6747] shadow"
                  : "text-[#62635a] hover:bg-[#ebe6dc] hover:text-[#34362f]"
              }`}
            >
              <Calendar className="w-4 h-4 text-current" />
              Dias da Semana
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                activeTab === "ai"
                  ? "bg-[#46614b] text-white border border-[#59785f] shadow"
                  : "text-[#4e6953] hover:bg-[#e6ece4] hover:text-[#344d39]"
              }`}
            >
              <Sparkles className="w-4 h-4 text-current" />
              Reflexão IA
            </button>

            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap relative ${
                activeTab === "favorites"
                  ? "bg-[#76583d] text-white border border-[#8a6747] shadow"
                  : "text-[#62635a] hover:bg-[#ebe6dc] hover:text-[#34362f]"
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
                  ? "bg-[#4c6861] text-white border border-[#5e7d74] shadow"
                  : "text-[#62635a] hover:bg-[#e4ebe8] hover:text-[#334b45]"
              }`}
            >
              <Volume2 className="w-4 h-4 text-cyan-400" />
              Ambiente
            </button>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <InstallAppButton />
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                isAudioPlaying
                  ? "bg-emerald-600/90 text-white border-emerald-400 animate-pulse shadow-md"
                  : "bg-[#ebe6dc] text-[#62635a] border-[#d7cfc2] hover:bg-[#dfd8cc]"
              }`}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              {isAudioPlaying ? "Sons Ligados" : "Sons da Natureza"}
            </button>

            <button
              onClick={openImmersive}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#eee2d1] border border-[#d8c4a8] text-[#76583d] hover:bg-[#e5d5bf] transition"
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
