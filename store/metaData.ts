import { emptyArray } from "@/constants/guess";
import { FormattedGuess, Solution } from "@/types/wordleTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  firstTime: boolean;
  roundEnded: string | null;
  wordsUsed: string[];
  setFirstTime: (firstTime: boolean) => void;
  setRoundEnded: (roundEnded: string | null) => void;
  setWordsUsed: (wordUsed: string) => void;
};

export const useMetaDataStore = create<Store>()(
  persist(
    (set) => ({
      firstTime: false,
      roundEnded: null,
      wordsUsed: [],
      setFirstTime: (firstTime) => set(() => ({ firstTime })),
      setRoundEnded: (roundEnded) => set(() => ({ roundEnded })),
      setWordsUsed: (wordUsed) =>
        set((state) => ({ wordsUsed: [...state.wordsUsed, wordUsed] })),
    }),
    { name: "game-metadata-storage" }
  )
);
