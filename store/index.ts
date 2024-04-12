import { emptyArray } from "@/constants/guess";
import {
  ALERT_SEVERITY,
  Alert,
  FormattedGuess,
  Solution,
} from "@/types/wordleTypes";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Store = {
  solution: Solution;
  turn: number;
  guess: string;
  guesses: FormattedGuess[][];
  history: string[];
  isCorrect: boolean;
  instructionsIsOpen: boolean;
  statsIsOpen: boolean;
  alert: Alert;
};

type Actions = {
  reset: () => void;
  setSolution: (solution: Solution) => void;
  increaseTurn: () => void;
  setGuess: (guess: string) => void;
  setGuesses: (guesses: FormattedGuess[]) => void;
  setHistory: (guess: string) => void;
  setIsCorrect: (isCorrect: boolean) => void;
  setInstructionsOpen: (isOpen: boolean) => void;
  setStatsOpen: (isOpen: boolean) => void;
  setAlert: (alert: Alert) => void;
};

const initialState: Store = {
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
  alert: {
    isOpen: false,
    message: "",
    severity: ALERT_SEVERITY.INFO,
  },
};

export const useStore = create<Store & Actions>()(
  devtools((set) => ({
    ...initialState,
    reset: () => {
      set(initialState);
    },
    setSolution: (solution) => set(() => ({ solution })),
    increaseTurn: () => set((state) => ({ turn: state.turn + 1 })),
    setGuess: (guess) =>
      set(() => ({
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
    setInstructionsOpen: (isOpen) =>
      set(() => ({ instructionsIsOpen: isOpen })),
    setStatsOpen: (isOpen) => set(() => ({ statsIsOpen: isOpen })),
    setAlert: (alert) => set(() => ({ alert })),
  }))
);
