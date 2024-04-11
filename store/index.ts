import { FormattedGuess, Solution } from "@/types/wordleTypes";
import { create } from "zustand";

type Store = {
  solution: Solution;
  turn: number;
  guess: string;
  guesses: FormattedGuess[][];
  history: string[];
  isCorrect: boolean;
  setSolution: (solution: Solution) => void;
  increaseTurn: () => void;
  setGuess: (guess: string) => void;
  setGuesses: (guesses: FormattedGuess[]) => void;
  setHistory: (guess: string) => void;
  setIsCorrect: (isCorrect: boolean) => void;
};

export const useStore = create<Store>()((set) => ({
  solution: {
    id: "",
    word: "",
  },
  turn: 0,
  guess: "",
  guesses: [...Array(6)],
  history: [],
  isCorrect: false,
  setSolution: (solution) => set(() => ({ solution })),
  increaseTurn: () => set((state) => ({ turn: state.turn + 1 })),
  setGuess: (guess) =>
    set((state) => ({
      guess,
    })),
  setGuesses: (guesses) =>
    set((state) => {
      let newGuess = [...state.guesses];
      newGuess[state.turn] = guesses;
      return { guesses: newGuess };
    }),
  setHistory: (guess) =>
    set((state) => ({ history: [...state.history, guess] })),
  setIsCorrect: (isCorrect) => set(() => ({ isCorrect })),
}));
