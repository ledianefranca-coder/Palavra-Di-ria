import React from "react";
import { DayOfWeekName } from "../types";
import { Calendar as CalendarIcon } from "lucide-react";

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
    <div className="bg-white/75 backdrop-blur-md rounded-2xl p-4 border border-[#ded5c7] shadow-[0_10px_35px_rgba(72,67,54,0.08)] mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-semibold text-[#55564d] flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#8a6747]" />
          Selecione o Dia da Semana
        </h3>
        <span className="hidden sm:inline text-xs text-[#77736a]">
          Tradução: <strong className="text-[#76583d]">Almeida Revista e Atualizada</strong>
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
                  ? "bg-[#76583d] text-white shadow-lg shadow-[#76583d]/20 border border-[#8a6747] -translate-y-0.5"
                  : isToday
                  ? "bg-[#eef2eb] text-[#3e5943] border border-[#91ab93] hover:bg-[#e4ebe2]"
                  : "bg-[#f8f5ef] text-[#777369] border border-[#e1d8cc] hover:bg-[#eee8de] hover:text-[#484940]"
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
                <div className="absolute bottom-1 w-1.5 h-1.5 bg-[#f2d49c] rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
