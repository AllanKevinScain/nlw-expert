import { ChangeEvent, FormEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { toast } from "sonner";
import { NewNoteCardInterface } from "../types";

let speechRecognition: SpeechRecognition | null;

export function NewNoteCard(props: NewNoteCardInterface) {
  const { createNote = () => null } = props;

  const [shouldShowOnBoarding, setShouldShowOnBoarding] =
    useState<boolean>(true);
  const [contentTextArea, setContentTextArea] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);

  function handleStartEditor() {
    setShouldShowOnBoarding((s) => !s);
  }

  function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const {
      target: { value },
    } = e;
    setContentTextArea(value);

    if (value === "") {
      handleStartEditor();
    }
  }

  function handleSaveNote(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!contentTextArea) return;
    createNote(contentTextArea);
    setContentTextArea("");
    handleStartEditor();

    toast.success("Nota criada com sucesso!");
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      alert("Seu navegador nao suporta a API de gravação!");

      return;
    }

    setIsRecording(true);
    setShouldShowOnBoarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContentTextArea(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.log("🚀 ~ handleStartRecording ~ event:", event);
    };

    speechRecognition.start();
  }
  function handleStopRecording() {
    setIsRecording(false);

    if (speechRecognition) {
      speechRecognition.stop();
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-left flex flex-col items-start rounded-md bg-slate-700 p-5 space-y-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content className="fixed inset-0 flex flex-col w-full max-w-[640px]  bg-slate-700 outline-none overflow-hidden md:left-1/2 md:top-1/2 md:inset-auto md:rounded-md md:-translate-x-1/2 md:-translate-y-1/2 md:h-[60vh]">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>
              {shouldShowOnBoarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece&nbsp;
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    gravando uma nota
                  </button>
                  &nbsp; em áudio ou se preferir&nbsp;
                  <button
                    type="button"
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartEditor}
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  value={contentTextArea}
                  onChange={handleContentChange}
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="flex items-center justify-center w-full bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando (clique p/ interromper)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
