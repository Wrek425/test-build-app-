import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface PDFSheet {
  id: string;
  name: string;
  url: string;
  uploadedAt: Date;
}

interface PDFStore {
  sheets: PDFSheet[];
  currentSheet: PDFSheet | null;
  addSheet: (name: string, url: string) => void;
  setCurrentSheet: (sheet: PDFSheet | null) => void;
  deleteSheet: (id: string) => void;
}

export const usePDFStore = create<PDFStore>((set) => ({
  sheets: [],
  currentSheet: null,
  addSheet: (name, url) =>
    set((state) => ({
      sheets: [
        ...state.sheets,
        {
          id: uuidv4(),
          name,
          url,
          uploadedAt: new Date(),
        },
      ],
    })),
  setCurrentSheet: (sheet) => set({ currentSheet: sheet }),
  deleteSheet: (id) =>
    set((state) => ({
      sheets: state.sheets.filter((sheet) => sheet.id !== id),
      currentSheet: state.currentSheet?.id === id ? null : state.currentSheet,
    })),
}));