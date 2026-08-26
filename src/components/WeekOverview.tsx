import React from "react";
import { CalendarDays, ChevronRight } from "lucide-react";
import { DailyReflection } from "../types";
import { getWeekDevotionals } from "../data/annualDevotionals";

interface WeekOverviewProps {
  onSelect: (reflection: DailyReflection) => void;
}

export const WeekOverview: React.FC<WeekOverviewProps> = ({ onSelect }) => {
  const week = getWeekDevotionals();
  const start = week[0].date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  const end = week[6].date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <section className="space-y-5">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#ded5c7] shadow-[0_10px_35px_rgba(72,67,54,0.08)]">
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#8a6747]">De segunda a domingo</p>
        <h2 className="text-xl font-serif font-bold text-[#4d483e] flex items-center gap-2 mt-1">
          <CalendarDays className="w-5 h-5 text-[#526c55]" /> Dias da semana
        </h2>
        <p className="text-sm text-[#77736a] mt-1 capitalize">{start} a {end}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {week.map(({ date, devotional, isToday }) => (
          <button
            key={date.toISOString()}
            onClick={() => onSelect(devotional)}
            className={`relative min-h-44 rounded-2xl overflow-hidden text-left border transition hover:-translate-y-1 hover:shadow-lg ${isToday ? "border-[#76583d] ring-2 ring-[#d9c3a5]" : "border-[#ded5c7]"}`}
          >
            <img src={devotional.bgImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-[#1e2821]/95 via-[#263229]/55 to-transparent" />
            {isToday && <span className="absolute top-2 right-2 bg-[#f4e4c9] text-[#63482f] text-[9px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full">Hoje</span>}
            <span className="relative z-10 h-full p-3 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-wider text-[#e7d4b4] font-bold">{devotional.dayOfWeekName}</span>
              <span className="text-2xl font-serif font-bold">{date.getDate()}</span>
              <span className="text-[11px] leading-snug line-clamp-2 mt-1">{devotional.title}</span>
              <span className="text-[10px] font-semibold text-[#dcebcf] flex items-center gap-1 mt-2">Abrir palavra <ChevronRight className="w-3 h-3" /></span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
