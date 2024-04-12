import { emptyArray } from "@/constants/guess";
import { FormattedGuess, Solution } from "@/types/wordleTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  firstTime: boolean;
  rounds: number;
  victories: number;
  roundEnded: string | null;
  wordsUsed: string[];
  theme: "dark" | "light";
};

type Actions = {
  setFirstTime: (firstTime: boolean) => void;
  increaseRounds: () => void;
  increaseVictories: () => void;
  setRoundEnded: (roundEnded: string | null) => void;
  setWordsUsed: (wordUsed: string) => void;
  toggleTheme: () => void;
};

export const useMetaDataStore = create<Store & Actions>()(
  persist(
    (set) => ({
      firstTime: true,
      rounds: 0,
      victories: 0,
      roundEnded: null,
      wordsUsed: [],
      theme: "light",
      setFirstTime: (firstTime) => set(() => ({ firstTime })),
      increaseRounds: () => set((state) => ({ rounds: state.rounds + 1 })),
      increaseVictories: () =>
        set((state) => ({ victories: state.victories + 1 })),
      setRoundEnded: (roundEnded) => set(() => ({ roundEnded })),
      setWordsUsed: (wordUsed) =>
        set((state) => ({ wordsUsed: [...state.wordsUsed, wordUsed] })),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
    }),
    { name: "game-metadata-storage" }
  )
);
