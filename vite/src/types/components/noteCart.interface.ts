export interface NoteCardInterface {
  id: string;
  date: Date;
  content: string;
  removeNote: (id: string) => void;
}
