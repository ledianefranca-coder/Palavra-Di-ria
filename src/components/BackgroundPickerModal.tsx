import React, { useState } from "react";
import { NATURE_IMAGE_GALLERY } from "../data/natureImages";
import { NatureCategory, NatureImageOption } from "../types";
import { X, Check, Image as ImageIcon, MapPin } from "lucide-react";

interface BackgroundPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (img: NatureImageOption) => void;
  currentUrl: string;
}

const CATEGORIES: { key: NatureCategory | "all"; label: string; icon: string }[] = [
  { key: "all", label: "Todas", icon: "🌍" },
  { key: "montanhas", label: "Montanhas", icon: "⛰️" },
  { key: "lago", label: "Lagos", icon: "🌊" },
  { key: "floresta", label: "Florestas", icon: "🌲" },
  { key: "porsol", label: "Pôr do Sol", icon: "🌅" },
  { key: "cachoeira", label: "Cachoeiras", icon: "🏞️" },
  { key: "flores", label: "Flores", icon: "🌸" },
  { key: "ceu", label: "Céu Estrelado", icon: "🌌" },
  { key: "campo", label: "Campos", icon: "🌾" },
];

export const BackgroundPickerModal: React.FC<BackgroundPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  currentUrl,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<NatureCategory | "all">("all");

  if (!isOpen) return null;

  const filtered = selectedCategory === "all"
    ? NATURE_IMAGE_GALLERY
    : NATURE_IMAGE_GALLERY.filter((img) => img.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-900 border border-stone-800 text-stone-100 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/90">
          <div>
            <h2 className="text-lg font-serif font-bold text-amber-100 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-400" />
              Escolha uma Imagem da Natureza Real
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Paisagens reais e naturais para acompanhar a sua reflexão espiritual.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-5 py-3 border-b border-stone-800 bg-stone-950/40 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedCategory === cat.key
                  ? "bg-emerald-700 text-white border border-emerald-500 shadow-md"
                  : "bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700/50"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((img) => {
            const isSelected = img.url === currentUrl;

            return (
              <div
                key={img.id}
                onClick={() => {
                  onSelectImage(img);
                  onClose();
                }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 h-48 flex flex-col justify-end ${
                  isSelected
                    ? "border-amber-400 ring-4 ring-amber-500/30 scale-[1.02]"
                    : "border-stone-800 hover:border-emerald-500/60 hover:scale-[1.01]"
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {isSelected && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 p-1.5 rounded-full font-bold shadow-lg">
                    <Check className="w-4 h-4" />
                  </div>
                )}

                <div className="relative p-3 z-10">
                  <h4 className="text-sm font-semibold text-white group-hover:text-amber-200 transition">
                    {img.title}
                  </h4>
                  <p className="text-[11px] text-stone-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{img.location}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between text-xs text-stone-400">
          <span>{filtered.length} paisagens disponíveis</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 text-stone-200 hover:bg-stone-700 transition"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
