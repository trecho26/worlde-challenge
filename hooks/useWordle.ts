import { isLetter } from "@/utils/regex";
import { useState } from "react";

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState(0);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [history, setHistory] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {};

  const addGuess = () => {
    //Only add guess if turn is less than 5
    if (turn > 5) {
      console.log("You used all your tuns");
      return;
    }

    //Only add new guess (not duplicate guesses)
    if (history.includes(guess)) {
      console.log("You already tried that word");
      return;
    }

    //Check if guess is 5 chars long
    if (guess.length !== 5) {
      console.log("Your guess must be 5 chars long");
      return;
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    const key = e.key;

    if (key === "Enter") {
      addGuess();
      return;
    }

    if (key === "Backspace") {
      setGuess((currGuess) => currGuess.slice(0, -1));
      return;
    }

    if (isLetter(key) && guess.length < 5) {
      setGuess((currGuess) => currGuess + key);
    }
  };

  return { turn, guess, guesses, isCorrect, handleKeyUp };
};

export default useWordle;
