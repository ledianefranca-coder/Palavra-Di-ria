import React from "react";
import { DayOfWeekName } from "../types";
import { Sun, Calendar as CalendarIcon, Check } from "lucide-react";

interface WeekSelectorProps {
  selectedDayCode: number; // 0..6
  onSelectDayCode: (code: number) => void;
  todayCode: number;
}

const WEEK_DAYS: { code: number; name: DayOfWeekName; short: string; symbol: string }[] = [
  { code: 0, name: "Domingo", short: "DOM", symbol: "☀️" },
  { code: 1, name: "Segunda-feira", short: "SEG", symbol: "🌄" },
  { code: 2, name: "Terça-feira", short: "TER", symbol: "🌿" },
  { code: 3, name: "Quarta-feira", short: "QUA", symbol: "🌊" },
  { code: 4, name: "Quinta-feira", short: "QUI", symbol: "⛰️" },
  { code: 5, name: "Sexta-feira", short: "SEX", symbol: "🌌" },
  { code: 6, name: "Sábado", short: "SÁB", symbol: "🌸" },
];

export const WeekSelector: React.FC<WeekSelectorProps> = ({
  selectedDayCode,
  onSelectDayCode,
  todayCode,
}) => {
  return (
    <div className="bg-stone-900/80 backdrop-blur-md rounded-2xl p-4 border border-stone-800 shadow-xl mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-semibold text-stone-300 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-amber-400" />
          Selecione o Dia da Semana
        </h3>
        <span className="text-xs text-stone-400">
          Tradução Bíblica: <strong className="text-amber-300">Almeida Revista e Atualizada (ARA)</strong>
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {WEEK_DAYS.map((day) => {
          const isSelected = selectedDayCode === day.code;
          const isToday = todayCode === day.code;

          return (
            <button
              key={day.code}
              onClick={() => onSelectDayCode(day.code)}
              className={`relative flex flex-col items-center justify-center py-3 px-1 rounded-xl transition-all duration-200 group ${
                isSelected
                  ? "bg-amber-700/90 text-white shadow-lg shadow-amber-900/30 border border-amber-500 scale-[1.02]"
                  : isToday
                  ? "bg-stone-800 text-stone-200 border border-emerald-500/60 hover:bg-stone-750"
                  : "bg-stone-800/50 text-stone-400 border border-stone-800 hover:bg-stone-800 hover:text-stone-200"
              }`}
            >
              {isToday && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.2 rounded-full shadow-sm">
                  Hoje
                </span>
              )}

              <span className="text-lg mb-1">{day.symbol}</span>
              <span className="text-xs font-bold tracking-tight">{day.short}</span>
              <span className="hidden sm:inline text-[10px] opacity-75 mt-0.5 truncate max-w-full px-1">
                {day.name.split("-")[0]}
              </span>

              {isSelected && (
                <div className="absolute bottom-1 w-1.5 h-1.5 bg-amber-300 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
