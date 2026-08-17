import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { WeekSelector } from "./components/WeekSelector";
import { DailyCard } from "./components/DailyCard";
import { BackgroundPickerModal } from "./components/BackgroundPickerModal";
import { ShareCardModal } from "./components/ShareCardModal";
import { AiReflectionModal } from "./components/AiReflectionModal";
import { NatureSoundPlayer } from "./components/NatureSoundPlayer";
import { FavoritesJournal } from "./components/FavoritesJournal";
import { ImmersiveMode } from "./components/ImmersiveMode";
import { WEEKLY_DEVOTIONALS, EXTRA_DEVOTIONALS } from "./data/dailyDevotionals";
import { DailyReflection, SavedFavorite, NatureImageOption } from "./types";
import { stopAmbientSound } from "./utils/audioSynthesizer";
import { Sparkles, BookOpen, Search, Heart, TreePine, Sun, RefreshCw } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"today" | "week" | "ai" | "favorites" | "sounds">("today");
  
  // Today's day of week code (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const todayCode = new Date().getDay();
  const [selectedDayCode, setSelectedDayCode] = useState<number>(todayCode);

  // Active Daily Reflection
  const [currentReflection, setCurrentReflection] = useState<DailyReflection>(() => {
    const match = WEEKLY_DEVOTIONALS.find((d) => d.dayOfWeekCode === todayCode);
    return match || WEEKLY_DEVOTIONALS[0];
  });

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<SavedFavorite[]>(() => {
    try {
      const saved = localStorage.getItem("palavra_diara_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isImmersiveOpen, setIsImmersiveOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Search filter for verses
  const [searchTerm, setSearchTerm] = useState("");

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("palavra_diara_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Erro ao salvar favoritos no localStorage:", e);
    }
  }, [favorites]);

  // When selected day of week changes, update current reflection
  const handleSelectDayCode = (code: number) => {
    setSelectedDayCode(code);
    const match = WEEKLY_DEVOTIONALS.find((d) => d.dayOfWeekCode === code);
    if (match) {
      setCurrentReflection(match);
    }
  };

  // Toggle favorite status
  const handleToggleFavorite = () => {
    const existingIndex = favorites.findIndex((f) => f.reflection.id === currentReflection.id);
    if (existingIndex >= 0) {
      setFavorites(favorites.filter((f) => f.reflection.id !== currentReflection.id));
    } else {
      const newFav: SavedFavorite = {
        id: `fav-${Date.now()}`,
        reflection: currentReflection,
        savedAt: new Date().toLocaleDateString("pt-BR"),
        userNote: "",
      };
      setFavorites([newFav, ...favorites]);
    }
  };

  const isCurrentFavorite = favorites.some((f) => f.reflection.id === currentReflection.id);

  // Update background image for current reflection
  const handleSelectNatureImage = (img: NatureImageOption) => {
    setCurrentReflection((prev) => ({
      ...prev,
      bgImageUrl: img.url,
      bgLocation: img.location,
      bgCategory: img.category,
    }));
  };

  // Handle AI generated reflection
  const handleAiReflectionGenerated = (newRef: DailyReflection) => {
    setCurrentReflection(newRef);
    setActiveTab("today");
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  const handleUpdateNote = (id: string, note: string) => {
    setFavorites(
      favorites.map((f) => (f.id === id ? { ...f, userNote: note } : f))
    );
  };

  // Combine all devotionals for search
  const allDevotionals = [...WEEKLY_DEVOTIONALS, ...EXTRA_DEVOTIONALS];
  const searchResults = searchTerm.trim()
    ? allDevotionals.filter(
        (d) =>
          d.verseText.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.verseReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.theme.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950 flex flex-col justify-between">
      
      {/* Top Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        isAudioPlaying={isAudioPlaying}
        toggleAudio={() => {
          if (isAudioPlaying) {
            stopAmbientSound();
            setIsAudioPlaying(false);
          } else {
            setActiveTab("sounds");
          }
        }}
        openImmersive={() => setIsImmersiveOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        
        {/* Search Bar */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-900/60 p-3 rounded-2xl border border-stone-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar versículo ARA (ex: Salmos, Paz, Coragem)..."
              className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-200 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-500/40 transition flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Gerar Reflexão com IA</span>
            </button>
          </div>
        </div>

        {/* Search Results Drawer */}
        {searchTerm.trim().length > 0 && (
          <div className="bg-stone-900 border border-amber-500/40 rounded-3xl p-5 mb-8 shadow-2xl">
            <h3 className="text-sm font-bold text-amber-200 mb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-400" />
              Resultados da Busca ARA ({searchResults.length}):
            </h3>
            {searchResults.length === 0 ? (
              <p className="text-xs text-stone-400">Nenhum resultado foi encontrado para "{searchTerm}".</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchResults.map((ref) => (
                  <div
                    key={ref.id}
                    onClick={() => {
                      setCurrentReflection(ref);
                      setSearchTerm("");
                      setActiveTab("today");
                    }}
                    className="p-3 bg-stone-950 hover:bg-stone-800 rounded-xl border border-stone-800 cursor-pointer transition"
                  >
                    <span className="text-[10px] font-bold text-amber-400 uppercase">{ref.dayOfWeekName}</span>
                    <p className="text-xs font-serif italic text-stone-200 mt-1">"{ref.verseText}"</p>
                    <p className="text-[11px] font-bold text-emerald-400 mt-1">— {ref.verseReference}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 1: Today & Week Selection */}
        {(activeTab === "today" || activeTab === "week") && (
          <div className="space-y-6">
            <WeekSelector
              selectedDayCode={selectedDayCode}
              onSelectDayCode={handleSelectDayCode}
              todayCode={todayCode}
            />

            <DailyCard
              reflection={currentReflection}
              isFavorite={isCurrentFavorite}
              onToggleFavorite={handleToggleFavorite}
              onOpenImagePicker={() => setIsImagePickerOpen(true)}
              onOpenShare={() => setIsShareOpen(true)}
              onOpenImmersive={() => setIsImmersiveOpen(true)}
            />
          </div>
        )}

        {/* Tab 2: AI Reflection Trigger */}
        {activeTab === "ai" && (
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl max-w-2xl mx-auto my-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-amber-100">
              Reflexão Espiritual em ARA com IA Gemini
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
              Deseja uma palavra inspirada especificamente para o que você está vivendo agora? Nossa Inteligência Artificial consulta fielmente a Bíblia Almeida Revista e Atualizada para lhe trazer um versículo, reflexão e oração adequados.
            </p>
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 transition flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-5 h-5" />
              <span>Pedir Reflexão Personalizada</span>
            </button>
          </div>
        )}

        {/* Tab 3: Favorites Journal */}
        {activeTab === "favorites" && (
          <FavoritesJournal
            favorites={favorites}
            onRemoveFavorite={handleRemoveFavorite}
            onUpdateNote={handleUpdateNote}
            onSelectReflection={(ref) => {
              setCurrentReflection(ref);
              setActiveTab("today");
            }}
          />
        )}

        {/* Tab 4: Nature Soundscapes */}
        {activeTab === "sounds" && (
          <NatureSoundPlayer
            isPlaying={isAudioPlaying}
            setIsPlaying={setIsAudioPlaying}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/80 bg-stone-900/60 py-6 text-center text-xs text-stone-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5">
            <TreePine className="w-4 h-4 text-emerald-400" />
            <span>Palavra Diária — Tradução Bíblica Almeida Revista e Atualizada (ARA)</span>
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-[11px] text-stone-400">
            <span>Fotografias reais da natureza • Paz e Fé para o seu dia</span>
            <span className="hidden sm:inline text-stone-600">•</span>
            <span className="text-amber-200/90 font-medium">Desenvolvido por Lediane França</span>
          </div>
        </div>
      </footer>

      {/* Background Picker Modal */}
      <BackgroundPickerModal
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onSelectImage={handleSelectNatureImage}
        currentUrl={currentReflection.bgImageUrl}
      />

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        reflection={currentReflection}
      />

      {/* AI Reflection Prompt Modal */}
      <AiReflectionModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onGenerated={handleAiReflectionGenerated}
      />

      {/* Immersive Fullscreen Mode */}
      <ImmersiveMode
        isOpen={isImmersiveOpen}
        onClose={() => setIsImmersiveOpen(false)}
        reflection={currentReflection}
        isAudioPlaying={isAudioPlaying}
        toggleAudio={() => {
          if (isAudioPlaying) {
            stopAmbientSound();
            setIsAudioPlaying(false);
          } else {
            setIsAudioPlaying(true);
          }
        }}
      />

    </div>
  );
}
