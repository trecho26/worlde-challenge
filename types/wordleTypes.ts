export enum ALERT_SEVERITY {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export enum GUESS_STATE {
  GREEN = "green",
  YELLOW = "yellow",
  GREY = "grey",
}

export type Solution = {
  id: string;
  word: string;
};

export type FormattedGuess = {
  key: string;
  color: GUESS_STATE;
};

export type UsedKeys = {
  [key: string]: GUESS_STATE;
};

export type Alert = {
  isOpen: boolean;
  message: string;
  severity: ALERT_SEVERITY;
};
