import React, { useState } from "react";
import { SavedFavorite } from "../types";
import { Heart, Search, Trash2, Edit3, Save, Calendar, BookOpen, Quote } from "lucide-react";

interface FavoritesJournalProps {
  favorites: SavedFavorite[];
  onRemoveFavorite: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  onSelectReflection: (reflection: SavedFavorite["reflection"]) => void;
}

export const FavoritesJournal: React.FC<FavoritesJournalProps> = ({
  favorites,
  onRemoveFavorite,
  onUpdateNote,
  onSelectReflection,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState("");

  const filtered = favorites.filter(
    (f) =>
      f.reflection.verseText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.reflection.verseReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.reflection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.userNote && f.userNote.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const startEditing = (fav: SavedFavorite) => {
    setEditingId(fav.id);
    setNoteInput(fav.userNote || "");
  };

  const saveNote = (id: string) => {
    onUpdateNote(id, noteInput);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            Meu Diário de Fé & Palavras Salvas
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Seus versículos e reflexões guardados com carinho para momentos de meditação.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar nos salvos..."
            className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-2xl pl-9 pr-4 py-2 text-xs text-stone-200 outline-none"
          />
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-stone-900/50 border border-stone-800 rounded-3xl p-12 text-center text-stone-400">
          <Heart className="w-12 h-12 text-stone-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-stone-300">Nenhuma palavra salva ainda</h3>
          <p className="text-xs text-stone-500 mt-1">
            Clique no ícone de coração nas reflexões diárias para guardá-las no seu diário de fé.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((fav) => {
            const isEditing = editingId === fav.id;

            return (
              <div
                key={fav.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-stone-700 transition"
              >
                <div>
                  {/* Top info */}
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/50 font-bold">
                      {fav.reflection.dayOfWeekName}
                    </span>
                    <span className="text-[11px] text-stone-500">{fav.savedAt}</span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-amber-100 mb-2">
                    {fav.reflection.title}
                  </h3>

                  {/* Verse quote box */}
                  <div className="p-3 bg-stone-950 rounded-xl border border-stone-800/80 mb-3 relative">
                    <Quote className="w-4 h-4 text-stone-700 absolute top-2 right-2" />
                    <p className="text-xs font-serif italic text-amber-200/90 leading-relaxed pr-5">
                      "{fav.reflection.verseText}"
                    </p>
                    <p className="text-[11px] font-bold text-emerald-400 text-right mt-1">
                      — {fav.reflection.verseReference}
                    </p>
                  </div>

                  {/* Notes Area */}
                  <div className="mt-3 border-t border-stone-800/80 pt-3">
                    <div className="flex items-center justify-between text-xs font-medium text-stone-400 mb-1">
                      <span>Anotação Pessoal / Pedido de Oração:</span>
                      {!isEditing && (
                        <button
                          onClick={() => startEditing(fav)}
                          className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <Edit3 className="w-3 h-3" /> Editar
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="space-y-2 mt-1">
                        <textarea
                          value={noteInput}
                          onChange={(e) => setNoteInput(e.target.value)}
                          placeholder="Escreva seus pensamentos ou motivo de oração..."
                          className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl p-2.5 text-xs text-stone-200 outline-none h-20 resize-none"
                        />
                        <button
                          onClick={() => saveNote(fav.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" /> Salvar Anotação
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-stone-300 italic bg-stone-950/40 p-2 rounded-lg border border-stone-800/40">
                        {fav.userNote || "Nenhuma anotação registrada."}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between border-t border-stone-800 pt-3 mt-4">
                  <button
                    onClick={() => onSelectReflection(fav.reflection)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Abrir Leitura
                  </button>

                  <button
                    onClick={() => onRemoveFavorite(fav.id)}
                    className="text-xs text-stone-500 hover:text-rose-400 flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remover
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
