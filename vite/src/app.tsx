import { ChangeEvent, useState } from "react";
import logo from "./assets/logo_nwl_expert.svg";
import { NewNoteCard, NoteCard } from "./components";
import { NoteType } from "./types";

const getNotesOnStorage = () => {
  const notesOnStorage = localStorage.getItem("notes");
  if (notesOnStorage) return JSON.parse(notesOnStorage);
  return [];
};

export function App() {
  const [notes, setNotes] = useState<NoteType[]>(getNotesOnStorage);
  const [search, setSearch] = useState("");

  function createNote(content: string) {
    const newNote = { id: crypto.randomUUID(), date: new Date(), content };

    const notesArray = [newNote, ...notes];

    setNotes((s) => [newNote, ...s]);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function removeNote(id: string) {
    const notesArray = notes.filter((n) => n.id !== id);

    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = e;

    setSearch(value);
  }

  const filteredNotes = () => {
    const hasSearch = search !== "";
    const lowerSearch = search.toLowerCase();
    if (hasSearch) {
      return notes.filter((i) => {
        const lowerContent = i.content.toLowerCase();
        return lowerContent.includes(lowerSearch);
      });
    }
    return notes;
  };

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 md:px-0">
      <img src={logo} alt="nwl expert" />

      <form className="w-full">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 auto-rows-[250px] gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NewNoteCard createNote={createNote} />

        {filteredNotes().map((i) => (
          <NoteCard key={i.id} {...i} removeNote={removeNote} />
        ))}
      </div>
    </div>
  );
}
