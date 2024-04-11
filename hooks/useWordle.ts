import { FormattedGuess } from "@/types/wordleTypes";
import { isLetter } from "@/utils/regex";
import { useState } from "react";

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState(0);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<FormattedGuess[][]>([...Array(6)]);
  const [history, setHistory] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {
    const solutionArr: (string | null)[] = solution.split("");
    const formattedGuess: FormattedGuess[] = guess.split("").map((letter) => {
      return {
        key: letter,
        color: "grey",
      };
    });

    //Find any accurate letters
    formattedGuess.forEach((letter, index) => {
      if (solutionArr[index] === letter.key) {
        formattedGuess[index].color = "green";
        solutionArr[index] = null;
      }
    });

    //Find letters that are on the solution but not in the correct order
    formattedGuess.forEach((letter, index) => {
      if (solutionArr.includes(letter.key) && letter.color !== "green") {
        formattedGuess[index].color = "yellow";
        solutionArr[solutionArr.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addGuess = (formattedGuess: FormattedGuess[]) => {
    if (guess === solution) {
      setIsCorrect(true);
      return;
    }

    setGuesses((prevGuesses) => {
      let newGuess = [...prevGuesses];
      newGuess[turn] = formattedGuess;
      return newGuess;
    });

    setHistory((prevHistory) => [...prevHistory, guess]);

    setTurn((prevTurn) => prevTurn + 1);

    setGuess("");
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    const key = e.key;

    if (key === "Enter") {
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

      const formattedGuess = formatGuess();
      addGuess(formattedGuess);
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
