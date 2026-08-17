import React, { useState } from "react";
import { DailyReflection } from "../types";
import { X, Copy, Check, Share2, MessageCircle } from "lucide-react";

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  reflection: DailyReflection;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  reflection,
}) => {
  const [copiedType, setCopiedType] = useState<"whatsapp" | "verse" | "full" | null>(null);

  if (!isOpen) return null;

  const whatsappText = `✨ *Palavra Diária de Fé - ${reflection.dayOfWeekName}* ✨\n\n📖 *${reflection.verseReference}*\n"${reflection.verseText}"\n\n🌿 *Reflexão:* ${reflection.reflectionText.slice(0, 200)}...\n\n🙏 *Oração:* ${reflection.prayer}\n\n📲 *Enviado via Palavra Diária ARA & Natureza*`;

  const handleCopy = (text: string, type: "whatsapp" | "verse" | "full") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-900 border border-stone-800 text-stone-100 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between">
          <h3 className="text-base font-serif font-bold text-amber-100 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-400" />
            Compartilhar Palavra de Fé
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Visual Preview */}
        <div className="p-6">
          <div className="relative rounded-2xl overflow-hidden p-6 text-white border border-amber-500/30 shadow-2xl min-h-[280px] flex flex-col justify-between">
            {/* Nature Background */}
            <img
              src={reflection.bgImageUrl}
              alt={reflection.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-950/50"></div>

            {/* Card Header Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 bg-amber-600/90 text-amber-50 text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-sm">
                {reflection.dayOfWeekName}
              </span>
              <span className="text-[10px] text-amber-200/80 font-mono tracking-wider">
                BÍBLIA ARA
              </span>
            </div>

            {/* Verse */}
            <div className="relative z-10 my-4">
              <p className="text-sm sm:text-base font-serif italic text-amber-100 leading-relaxed mb-2">
                "{reflection.verseText}"
              </p>
              <p className="text-xs font-bold text-emerald-300 tracking-wide text-right">
                — {reflection.verseReference}
              </p>
            </div>

            {/* Footer */}
            <div className="relative z-10 border-t border-white/20 pt-3 flex items-center justify-between text-[11px] text-stone-300">
              <span className="font-semibold text-amber-200">Palavra Diária ARA</span>
              <span>{reflection.bgLocation}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-0 space-y-3">
          <button
            onClick={() => handleCopy(whatsappText, "whatsapp")}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
          >
            {copiedType === "whatsapp" ? (
              <>
                <Check className="w-5 h-5 text-white" />
                <span>Copiado para WhatsApp!</span>
              </>
            ) : (
              <>
                <MessageCircle className="w-5 h-5" />
                <span>Copiar Mensagem Formatada para WhatsApp</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleCopy(`"${reflection.verseText}" — ${reflection.verseReference}`, "verse")}
              className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition flex items-center justify-center gap-2"
            >
              {copiedType === "verse" ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Versículo Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copiar Apenas Versículo</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleCopy(`${reflection.title}\n\n${reflection.reflectionText}\n\nOração: ${reflection.prayer}`, "full")}
              className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition flex items-center justify-center gap-2"
            >
              {copiedType === "full" ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Reflexão Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copiar Reflexão Completa</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
