export type Solution = {
  id: string;
  word: string;
};

export type ColorStates = "grey" | "green" | "yellow";

export type FormattedGuess = {
  key: string;
  color: ColorStates;
};

export type UsedKeys = {
  [key: string]: ColorStates;
};
