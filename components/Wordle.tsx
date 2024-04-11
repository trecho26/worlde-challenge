import useWordle from "@/hooks/useWordle";
import { useStore } from "@/store";
import { Solution } from "@/types/wordleTypes";
import { useEffect } from "react";
import Grid from "./Grid";

const Wordle = () => {
  const { solution, guess, guesses, isCorrect, turn } = useStore();
  const { handleKeyUp } = useWordle();

  useEffect(() => {
    if (!window) return;

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  useEffect(() => {
    console.log(guesses);
    console.log(turn);
    console.log(isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <>
      <div>Solution - {solution.word}</div>
      <div>current guess - {guess}</div>
      <Grid />
    </>
  );
};

export default Wordle;
