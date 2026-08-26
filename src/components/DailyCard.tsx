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
    <article className="relative rounded-[1.75rem] overflow-hidden shadow-[0_24px_70px_rgba(65,58,46,0.16)] border border-[#ded5c7] bg-[#fffdfa] transition-all duration-300">
      
      {/* Nature Photo Background Header Banner */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden flex flex-col justify-between p-6 text-white">
        <img
          src={reflection.bgImageUrl}
          alt={reflection.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f2821]/95 via-[#253129]/52 to-[#283329]/25"></div>

        {/* Top Badges & Actions */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 bg-[#8a6747]/95 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md border border-white/20">
              {reflection.dayOfWeekName}
            </span>
            <span className="hidden sm:inline px-3 py-1 bg-[#263229]/70 backdrop-blur-md text-white/90 text-xs font-medium rounded-full border border-white/20">
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
          <h2 className="text-lg sm:text-2xl font-serif font-bold text-[#fffaf0] leading-relaxed drop-shadow-md max-w-3xl">
            “{reflection.verseText}”
          </h2>
          <p className="text-xs sm:text-sm font-bold text-[#dcebcf] tracking-wide mt-2 text-right">
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
      <div className="p-6 sm:p-8 space-y-7">

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#f6f1e8] rounded-2xl border border-[#e0d6c8]">
          <button
            onClick={handleSpeechToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              isSpeechReading
                ? "bg-amber-500 text-stone-950 shadow-md animate-pulse"
                : "bg-white hover:bg-[#eee8de] text-[#55564d] border border-[#d8cfc2]"
            }`}
          >
            {isSpeechReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            <span>{isSpeechReading ? "Pausar Leitura" : "Ouvir Reflexão em Áudio"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e6ede4] hover:bg-[#dbe6d9] border border-[#b6c8b5] text-[#3f5a44] text-xs font-semibold transition"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#504638]">
            {reflection.title}
          </h3>
          <p className="text-xs text-[#8a6747] font-medium mt-1">
            Tema de Fé: {reflection.theme}
          </p>
        </div>

        {/* Reflection Paragraphs */}
        <div className="text-[#5d5e55] text-sm sm:text-base leading-7 space-y-4">
          <p>{reflection.reflectionText}</p>
        </div>

        {/* Prayer Section */}
        <div className="bg-[#f1eadf] border border-[#dccbb4] rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-serif font-bold text-[#76583d] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#a67b4d]" />
              Oração para o Dia de Hoje
            </h4>
            <span className="text-[10px] text-[#9b7958] uppercase tracking-widest font-mono">
              Comunhão
            </span>
          </div>

          <p className="text-sm font-serif italic text-[#5a4c3d] leading-relaxed">
            “{reflection.prayer}”
          </p>
        </div>

        {/* Practical Action Box */}
        <div
          onClick={() => setIsCompletedAction(!isCompletedAction)}
          className={`p-4 rounded-2xl border transition cursor-pointer flex items-center gap-3.5 ${
            isCompletedAction
              ? "bg-emerald-950/60 border-emerald-500 text-emerald-100"
              : "bg-[#f8f5ef] border-[#ded5c7] text-[#5d5e55] hover:border-[#b9a98f]"
          }`}
        >
          <div className={`p-2 rounded-xl shrink-0 ${isCompletedAction ? "bg-emerald-600 text-white" : "bg-[#e9e3d8] text-[#77736a]"}`}>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8a6747]">
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
    </article>
  );
};
