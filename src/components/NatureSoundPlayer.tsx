import React, { useState, useEffect } from "react";
import { playAmbientSound, stopAmbientSound, getCurrentSoundType } from "../utils/audioSynthesizer";
import { Volume2, VolumeX, CloudRain, Trees, Waves, Music, Wind } from "lucide-react";

interface NatureSoundPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const SOUND_OPTIONS: { id: "rain" | "forest" | "ocean" | "river" | "wind" | "piano"; name: string; icon: React.ReactNode; desc: string }[] = [
  { id: "rain", name: "Chuva Suave", icon: <CloudRain className="w-5 h-5 text-blue-400" />, desc: "Pingos de chuva no campo" },
  { id: "forest", name: "Brisa na Floresta", icon: <Trees className="w-5 h-5 text-emerald-400" />, desc: "Vento calmo entre as folhas" },
  { id: "ocean", name: "Ondas do Mar", icon: <Waves className="w-5 h-5 text-cyan-400" />, desc: "Ondas suaves na praia" },
  { id: "river", name: "Rio de Águas Vivas", icon: <Wind className="w-5 h-5 text-teal-400" />, desc: "Correnteza tranquila de montanha" },
  { id: "piano", name: "Melodia de Meditação", icon: <Music className="w-5 h-5 text-amber-400" />, desc: "Acordes suaves de oração" },
];

export const NatureSoundPlayer: React.FC<NatureSoundPlayerProps> = ({
  isPlaying,
  setIsPlaying,
}) => {
  const [activeSound, setActiveSound] = useState<"rain" | "forest" | "ocean" | "river" | "wind" | "piano">("rain");

  const handleSelectSound = (id: "rain" | "forest" | "ocean" | "river" | "wind" | "piano") => {
    setActiveSound(id);
    playAmbientSound(id);
    setIsPlaying(true);
  };

  const toggleMasterPlay = () => {
    if (isPlaying) {
      stopAmbientSound();
      setIsPlaying(false);
    } else {
      playAmbientSound(activeSound);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-xl mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-serif font-bold text-amber-100 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-emerald-400" />
            Sons da Natureza Real & Ambiente de Meditação
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Ouça paisagens sonoras naturais para acalmar a mente enquanto lê a Palavra de Deus.
          </p>
        </div>

        <button
          onClick={toggleMasterPlay}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-lg ${
            isPlaying
              ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40 animate-pulse"
              : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40"
          }`}
        >
          {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          {isPlaying ? "Pausar Sons" : "Tocar Ambiente"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SOUND_OPTIONS.map((snd) => {
          const isCurrentActive = isPlaying && activeSound === snd.id;

          return (
            <div
              key={snd.id}
              onClick={() => handleSelectSound(snd.id)}
              className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 flex items-center gap-3.5 ${
                isCurrentActive
                  ? "bg-emerald-950/80 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-500/20"
                  : "bg-stone-800/60 border-stone-700/60 text-stone-300 hover:bg-stone-800 hover:text-white"
              }`}
            >
              <div className={`p-3 rounded-xl ${isCurrentActive ? "bg-emerald-600 text-white" : "bg-stone-900"}`}>
                {snd.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold truncate">{snd.name}</h4>
                  {isCurrentActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  )}
                </div>
                <p className="text-[11px] text-stone-400 truncate mt-0.5">{snd.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
