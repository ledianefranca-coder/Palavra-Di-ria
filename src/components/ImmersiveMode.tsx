import React, { useState } from "react";
import { DailyReflection } from "../types";
import { X, Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { speakText, stopSpeaking } from "../utils/audioSynthesizer";

interface ImmersiveModeProps {
  reflection: DailyReflection;
  isOpen: boolean;
  onClose: () => void;
  isAudioPlaying: boolean;
  toggleAudio: () => void;
}

export const ImmersiveMode: React.FC<ImmersiveModeProps> = ({
  reflection,
  isOpen,
  onClose,
  isAudioPlaying,
  toggleAudio,
}) => {
  const [isSpeechReading, setIsSpeechReading] = useState(false);

  if (!isOpen) return null;

  const handleSpeak = () => {
    if (isSpeechReading) {
      stopSpeaking();
      setIsSpeechReading(false);
    } else {
      const fullText = `Versículo: ${reflection.verseText}. Referência: ${reflection.verseReference}. Reflexão: ${reflection.reflectionText}. Oração: ${reflection.prayer}`;
      speakText(
        fullText,
        () => setIsSpeechReading(true),
        () => setIsSpeechReading(false),
        () => setIsSpeechReading(false)
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 text-white flex flex-col justify-between overflow-hidden animate-fadeIn">
      {/* Full Nature Image Background */}
      <img
        src={reflection.bgImageUrl}
        alt={reflection.title}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.65] contrast-[1.05] scale-105 animate-pulse-slow"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60"></div>

      {/* Top Floating Controls */}
      <div className="relative z-10 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-amber-600/80 backdrop-blur-md text-amber-100 text-xs font-bold rounded-full uppercase tracking-wider border border-amber-400/30">
            {reflection.dayOfWeekName}
          </span>
          <span className="text-xs text-stone-300 font-mono tracking-wider hidden sm:inline">
            {reflection.bgLocation}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition flex items-center gap-1.5 ${
              isSpeechReading
                ? "bg-amber-500 text-stone-950 font-bold animate-pulse"
                : "bg-black/50 text-stone-200 border border-white/20 hover:bg-black/70"
            }`}
          >
            <Volume2 className="w-4 h-4" />
            {isSpeechReading ? "Lendo..." : "Ouvir Mensagem"}
          </button>

          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full backdrop-blur-md transition ${
              isAudioPlaying ? "bg-emerald-600 text-white" : "bg-black/50 text-stone-200 border border-white/20"
            }`}
            title="Sons da Natureza"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/60 text-stone-200 border border-white/20 hover:bg-black/80 transition"
            title="Sair do Modo Imersivo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Typography Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 text-center flex flex-col items-center justify-center space-y-6">
        <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-stone-950/60 px-3 py-1 rounded-full border border-amber-500/30">
          {reflection.theme}
        </span>

        {/* Big Verse Quote */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-relaxed text-amber-50 drop-shadow-lg tracking-tight">
          "{reflection.verseText}"
        </h1>

        <p className="text-sm sm:text-base font-bold text-emerald-300 tracking-wider">
          — {reflection.verseReference}
        </p>

        {/* Reflection Paragraph */}
        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-2xl bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl">
          {reflection.reflectionText}
        </p>
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 p-6 text-center text-xs text-stone-400">
        <p>Pressione a tecla ESC ou clique no 'X' para retornar à navegação</p>
      </div>
    </div>
  );
};
