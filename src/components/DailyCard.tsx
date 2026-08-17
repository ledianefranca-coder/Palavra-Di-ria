import React, { useState } from "react";
import { DailyReflection, NatureImageOption } from "../types";
import {
  Heart,
  Volume2,
  VolumeX,
  Share2,
  Image as ImageIcon,
  Maximize2,
  CheckCircle2,
  Sparkles,
  Quote,
  MapPin,
  BookOpen,
  Send,
  Calendar,
} from "lucide-react";
import { speakText, stopSpeaking } from "../utils/audioSynthesizer";

interface DailyCardProps {
  reflection: DailyReflection;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenImagePicker: () => void;
  onOpenShare: () => void;
  onOpenImmersive: () => void;
}

export const DailyCard: React.FC<DailyCardProps> = ({
  reflection,
  isFavorite,
  onToggleFavorite,
  onOpenImagePicker,
  onOpenShare,
  onOpenImmersive,
}) => {
  const [isCompletedAction, setIsCompletedAction] = useState(false);
  const [isSpeechReading, setIsSpeechReading] = useState(false);
  const [showPrayer, setShowPrayer] = useState(true);

  const handleSpeechToggle = () => {
    if (isSpeechReading) {
      stopSpeaking();
      setIsSpeechReading(false);
    } else {
      const fullText = `Palavra do dia para ${reflection.dayOfWeekName}. Versículo: ${reflection.verseText}. Referência: ${reflection.verseReference}. Reflexão: ${reflection.reflectionText}. Oração: ${reflection.prayer}`;
      speakText(
        fullText,
        () => setIsSpeechReading(true),
        () => setIsSpeechReading(false),
        () => setIsSpeechReading(false)
      );
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-800 bg-stone-900 transition-all duration-300">
      
      {/* Nature Photo Background Header Banner */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden flex flex-col justify-between p-6 text-white">
        <img
          src={reflection.bgImageUrl}
          alt={reflection.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40"></div>

        {/* Top Badges & Actions */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 bg-amber-600/90 backdrop-blur-md text-amber-50 text-xs font-bold rounded-full uppercase tracking-wider shadow-md border border-amber-400/30">
              {reflection.dayOfWeekName}
            </span>
            <span className="hidden sm:inline px-3 py-1 bg-stone-900/70 backdrop-blur-md text-stone-300 text-xs font-medium rounded-full border border-stone-700/50">
              {reflection.theme}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenImagePicker}
              className="p-2.5 rounded-full bg-stone-900/70 backdrop-blur-md text-stone-200 hover:text-white hover:bg-stone-800 border border-white/20 transition"
              title="Trocar Imagem de Fundo"
            >
              <ImageIcon className="w-4 h-4 text-emerald-400" />
            </button>

            <button
              onClick={onToggleFavorite}
              className={`p-2.5 rounded-full backdrop-blur-md transition border ${
                isFavorite
                  ? "bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-950/50 scale-110"
                  : "bg-stone-900/70 text-stone-200 border-white/20 hover:bg-stone-800 hover:text-rose-400"
              }`}
              title={isFavorite ? "Salvo nos Favoritos" : "Salvar nos Favoritos"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`} />
            </button>

            <button
              onClick={onOpenImmersive}
              className="p-2.5 rounded-full bg-stone-900/70 backdrop-blur-md text-amber-200 hover:text-amber-100 border border-white/20 transition"
              title="Modo Leitura Imersiva"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Verse Highlight overlay */}
        <div className="relative z-10 my-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-widest mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Versículo Diário — Almeida Revista e Atualizada (ARA)</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-serif font-bold text-amber-50 leading-relaxed drop-shadow-md">
            "{reflection.verseText}"
          </h2>
          <p className="text-xs sm:text-sm font-bold text-emerald-300 tracking-wide mt-2 text-right">
            — {reflection.verseReference}
          </p>
        </div>

        {/* Location attribution */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-300 border-t border-white/10 pt-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-none">{reflection.bgLocation}</span>
          </span>
          <span className="font-semibold text-amber-200">Bíblia ARA</span>
        </div>
      </div>

      {/* Main Reflection Body */}
      <div className="p-6 sm:p-8 space-y-6">

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-stone-950/80 rounded-2xl border border-stone-800">
          <button
            onClick={handleSpeechToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              isSpeechReading
                ? "bg-amber-500 text-stone-950 shadow-md animate-pulse"
                : "bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700"
            }`}
          >
            {isSpeechReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            <span>{isSpeechReading ? "Pausar Leitura" : "Ouvir Reflexão em Áudio"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
            {reflection.title}
          </h3>
          <p className="text-xs text-amber-400/80 font-medium mt-1">
            Tema de Fé: {reflection.theme}
          </p>
        </div>

        {/* Reflection Paragraphs */}
        <div className="text-stone-300 text-sm sm:text-base leading-relaxed space-y-4">
          <p>{reflection.reflectionText}</p>
        </div>

        {/* Prayer Section */}
        <div className="bg-stone-950/90 border border-amber-900/40 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-serif font-bold text-amber-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Oração para o Dia de Hoje
            </h4>
            <span className="text-[10px] text-amber-400/70 uppercase tracking-widest font-mono">
              Comunhão
            </span>
          </div>

          <p className="text-xs sm:text-sm font-serif italic text-amber-100/90 leading-relaxed">
            "{reflection.prayer}"
          </p>
        </div>

        {/* Practical Action Box */}
        <div
          onClick={() => setIsCompletedAction(!isCompletedAction)}
          className={`p-4 rounded-2xl border transition cursor-pointer flex items-center gap-3.5 ${
            isCompletedAction
              ? "bg-emerald-950/60 border-emerald-500 text-emerald-100"
              : "bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700"
          }`}
        >
          <div className={`p-2 rounded-xl shrink-0 ${isCompletedAction ? "bg-emerald-600 text-white" : "bg-stone-800 text-stone-400"}`}>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Atitude Prática do Dia
              </span>
              {isCompletedAction && (
                <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                  Concluído!
                </span>
              )}
            </div>
            <p className="text-xs mt-0.5">{reflection.practicalAction}</p>
          </div>
        </div>

      </div>
    </div>
  );
};
