import { useStore } from "@/store";
import { FormattedGuess } from "@/types/wordleTypes";
import { isLetter } from "@/utils/regex";
import { useState } from "react";

const useWordle = () => {
  const {
    solution,
    turn,
    guess,
    history,
    increaseTurn,
    setGuess,
    setGuesses,
    setHistory,
    setIsCorrect,
  } = useStore();

  const formatGuess = () => {
    const solutionArr: (string | null)[] = solution.word.split("");
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
    if (guess === solution.word) {
      setIsCorrect(true);
    }

    setGuesses(formattedGuess);

    setHistory(guess);

    increaseTurn();

    setGuess("");
  };

  const handleKeyUp = (key: string) => {
    if (turn > 5) {
      console.log("You used all your tuns");
      return;
    }

    if (key === "Enter") {
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
      setGuess(guess.slice(0, -1));
      return;
    }

    if (isLetter(key) && guess.length < 5) {
      setGuess(guess + key);
    }
  };

  return { handleKeyUp };
};

export default useWordle;
