import React from "react";
import { ChevronLeft, ChevronRight, MoonStar } from "lucide-react";
import { DevotionalCategory } from "../types";

const CATEGORIES: DevotionalCategory[] = [
  "Paz", "Coragem", "Gratidão", "Recomeço", "Esperança", "Família", "Para dormir",
];

const CATEGORY_FLOWERS: Record<DevotionalCategory | "Todas", { flower: string; label: string }> = {
  Todas: { flower: "💐", label: "Todas" },
  Paz: { flower: "🌸", label: "Paz" },
  Coragem: { flower: "🌻", label: "Coragem" },
  Gratidão: { flower: "🌷", label: "Gratidão" },
  Recomeço: { flower: "🌼", label: "Recomeço" },
  Esperança: { flower: "🌺", label: "Esperança" },
  Família: { flower: "🌹", label: "Família" },
  "Para dormir": { flower: "🪻", label: "Para dormir" },
};

interface AnnualNavigatorProps {
  dateKey?: string;
  dayOfYear?: number;
  category?: DevotionalCategory;
  selectedCategory: DevotionalCategory | "Todas";
  onCategoryChange: (category: DevotionalCategory | "Todas") => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  completedCount: number;
}

export const AnnualNavigator: React.FC<AnnualNavigatorProps> = ({
  dateKey,
  dayOfYear,
  category,
  selectedCategory,
  onCategoryChange,
  onPrevious,
  onNext,
  onToday,
  completedCount,
}) => {
  const formattedDate = dateKey
    ? new Date(`2025-${dateKey}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })
    : "Hoje";

  return (
    <section className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-[#ded5c7] shadow-[0_10px_35px_rgba(72,67,54,0.08)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#8a6747]">Sua caminhada anual</p>
          <h2 className="font-serif font-bold text-[#4d483e] capitalize">{formattedDate} · Dia {dayOfYear || 1} de 365</h2>
          <p className="text-xs text-[#77736a] mt-0.5">Uma palavra, uma reflexão e uma atitude inéditas para hoje · {completedCount} atitudes vividas.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onPrevious} aria-label="Palavra anterior" className="p-2.5 rounded-xl bg-[#f3eee5] hover:bg-[#e8e1d5] text-[#665e51] border border-[#ddd3c4]"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={onToday} className="px-4 py-2.5 rounded-xl bg-[#76583d] hover:bg-[#63482f] text-white text-xs font-bold">Palavra de hoje</button>
          <button onClick={onNext} aria-label="Próxima palavra" className="p-2.5 rounded-xl bg-[#f3eee5] hover:bg-[#e8e1d5] text-[#665e51] border border-[#ddd3c4]"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pt-4 pb-1" aria-label="Categorias de reflexão">
        {["Todas", ...CATEGORIES].map((item) => {
          const active = selectedCategory === item;
          const flower = CATEGORY_FLOWERS[item as DevotionalCategory | "Todas"];
          return (
            <button
              key={item}
              onClick={() => onCategoryChange(item as DevotionalCategory | "Todas")}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold border transition flex items-center gap-1.5 ${active ? "bg-[#46614b] text-white border-[#46614b]" : "bg-[#f8f5ef] text-[#64645b] border-[#dfd6ca] hover:border-[#9aaa98]"}`}
            >
              <span aria-hidden="true" className="text-sm leading-none">{flower.flower}</span>
              {flower.label}
            </button>
          );
        })}
      </div>
      {category === "Para dormir" && (
        <p className="mt-3 text-xs text-[#526653] bg-[#edf2eb] border border-[#cad8c8] rounded-xl px-3 py-2 flex items-center gap-2">
          <MoonStar className="w-4 h-4" /> Prepare o coração para encerrar o dia em paz.
        </p>
      )}
    </section>
  );
};
