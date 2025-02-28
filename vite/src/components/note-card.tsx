import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";
import { NoteCardInterface } from "../types";

export function NoteCard(props: NoteCardInterface) {
  const { content, date, id, removeNote = () => null } = props;

  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-left flex flex-col items-start rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {date.toISOString()}
        </span>
        <p className="text-sm leading-6 text-slate-400">{content}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content className="fixed flex flex-col w-full max-w-[640px] bg-slate-700 outline-none overflow-hidden md:left-1/2 md:top-1/2 md:inset-auto md:rounded-md md:-translate-x-1/2 md:-translate-y-1/2 md:h-[60vh]">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(date, { locale: ptBR, addSuffix: true })}
            </span>
            <p className="text-sm leading-6 text-slate-400">{content}</p>
          </div>

          <button
            type="button"
            onClick={() => removeNote(id)}
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
          >
            Deseja&nbsp;
            <span className="group-hover:underline text-red-400">
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
