import React, { useState } from "react";
import { DailyReflection } from "../types";
import { Sparkles, X, Heart, Loader2, BookOpen, Send, RefreshCw, Volume2 } from "lucide-react";
import { NATURE_IMAGE_GALLERY } from "../data/natureImages";

interface AiReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (reflection: DailyReflection) => void;
}

const PRESET_FEELINGS = [
  { label: "Paz e Ansiedade", topic: "vencer a ansiedade e encontrar a paz de Cristo", icon: "🕊️" },
  { label: "Gratidão e Louvor", topic: "agradecer a Deus pelas bênçãos diárias", icon: "🙌" },
  { label: "Coragem e Força", topic: "renovar forças para vencer desafios difíceis", icon: "🛡️" },
  { label: "Família e Lar", topic: "abençoar a família, união e sabedoria no lar", icon: "🏡" },
  { label: "Tomar Decisões", topic: "direção divina e sabedoria para escolhas importantes", icon: "🧭" },
  { label: "Saúde e Cura", topic: "restauração da saúde física, emocional e espiritual", icon: "🌿" },
  { label: "Esperança e Futuro", topic: "confiar nos planos de Deus para o amanhã", icon: "🌅" },
];

export const AiReflectionModal: React.FC<AiReflectionModalProps> = ({
  isOpen,
  onClose,
  onGenerated,
}) => {
  const [customInput, setCustomInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (topicToUse?: string) => {
    const finalTopic = topicToUse || customInput.trim();
    if (!finalTopic) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/gemini/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: finalTopic }),
      });

      const resData = await response.json();

      if (!resData.success || !resData.data) {
        throw new Error(resData.error || "Falha ao gerar a reflexão.");
      }

      const generatedData = resData.data;

      // Select random matching nature background
      const matchingNature = NATURE_IMAGE_GALLERY.find(
        (img) => img.category === generatedData.categoriaNatureza
      ) || NATURE_IMAGE_GALLERY[Math.floor(Math.random() * NATURE_IMAGE_GALLERY.length)];

      const newReflection: DailyReflection = {
        id: `ai-gen-${Date.now()}`,
        dayOfWeekCode: new Date().getDay(),
        dayOfWeekName: "Quarta-feira", // Will be overridden or set to current
        title: generatedData.titulo || "Reflexão de Fé e Esperança",
        theme: "Reflexão Personalizada IA em ARA",
        verseText: generatedData.versiculo || "O SENHOR é a minha luz e a minha salvação; de quem terei medo?",
        verseReference: (generatedData.referencia || "Salmos 27:1") + " (ARA)",
        reflectionText: generatedData.reflexao || "Reflexão gerada.",
        prayer: generatedData.oracao || "Senhor, ilumina o meu caminho. Amém.",
        practicalAction: generatedData.acaoPratica || "Hoje, medite neste versículo.",
        bgCategory: matchingNature.category,
        bgImageUrl: matchingNature.url,
        bgLocation: matchingNature.location,
        tags: ["IA Gemini", "Bíblia ARA", "Reflexão Personalizada"],
      };

      onGenerated(newReflection);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Não foi possível gerar a reflexão no momento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-900 border border-stone-800 text-stone-100 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-100">
                Reflexão Bíblica Personalizada
              </h3>
              <p className="text-xs text-stone-400">
                Alimentado pela IA do Gemini com base na Bíblia Sagrada ARA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {errorMessage && (
            <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-200 text-xs rounded-xl">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-amber-200/90 uppercase tracking-wider mb-2">
              Como você está se sentindo hoje? Escolha um tema:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESET_FEELINGS.map((item, idx) => (
                <button
                  key={idx}
                  disabled={loading}
                  onClick={() => handleGenerate(item.topic)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-800/80 hover:bg-emerald-900/60 border border-stone-700/60 hover:border-emerald-500 text-stone-200 hover:text-white text-xs font-medium transition text-left group"
                >
                  <span className="text-base group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-stone-900 px-2 text-stone-500 font-semibold">
                Ou digite seu pedido
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              Escreva um motivo, versículo ou dúvida do seu coração:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Ex: Preciso de sabedoria para decidir sobre meu emprego..."
                className="flex-1 bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGenerate();
                }}
              />
              <button
                disabled={loading || !customInput.trim()}
                onClick={() => handleGenerate()}
                className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-bold text-sm transition flex items-center gap-2 shadow-lg shadow-amber-900/40"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/60 text-center text-[11px] text-stone-400">
          ✨ A IA gera respostas guiadas estritamente pela fidelidade bíblica da versão ARA.
        </div>

      </div>
    </div>
  );
};
