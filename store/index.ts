import { emptyArray } from "@/constants/guess";
import { FormattedGuess, Solution } from "@/types/wordleTypes";
import { create } from "zustand";

type Store = {
  solution: Solution;
  turn: number;
  guess: string;
  guesses: FormattedGuess[][];
  history: string[];
  isCorrect: boolean;
  instructionsIsOpen: boolean;
  statsIsOpen: boolean;
  lastPlay: string | null;
  roundEnded: string | null;
  setSolution: (solution: Solution) => void;
  increaseTurn: () => void;
  setGuess: (guess: string) => void;
  setGuesses: (guesses: FormattedGuess[]) => void;
  setHistory: (guess: string) => void;
  setIsCorrect: (isCorrect: boolean) => void;
  setInstructionsOpen: (isOpen: boolean) => void;
  setStatsOpen: (isOpen: boolean) => void;
  setLastPlay: (lastPlay: string | null) => void;
  setRoundEnded: (roundEnded: string | null) => void;
};

export const useStore = create<Store>()((set) => ({
  solution: {
    id: "",
    word: "",
  },
  turn: 1,
  guess: "",
  guesses: emptyArray,
  history: [],
  isCorrect: false,
  instructionsIsOpen: false,
  statsIsOpen: false,
  lastPlay: null,
  roundEnded: null,
  setSolution: (solution) => set(() => ({ solution })),
  increaseTurn: () => set((state) => ({ turn: state.turn + 1 })),
  setGuess: (guess) =>
    set((state) => ({
      guess,
    })),
  setGuesses: (guesses) =>
    set((state) => {
      let newGuess = [...state.guesses];
      newGuess[state.turn - 1] = guesses;
      return { guesses: newGuess };
    }),
  setHistory: (guess) =>
    set((state) => ({ history: [...state.history, guess] })),
  setIsCorrect: (isCorrect) => set(() => ({ isCorrect })),
  setInstructionsOpen: (isOpen) => set(() => ({ instructionsIsOpen: isOpen })),
  setStatsOpen: (isOpen) => set(() => ({ statsIsOpen: isOpen })),
  setLastPlay: (lastPlay) => set(() => ({ lastPlay })),
  setRoundEnded: (roundEnded) => set(() => ({ roundEnded })),
}));
