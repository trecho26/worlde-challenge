import useWordle from "@/hooks/useWordle";
import { Solution } from "@/types/wordleTypes";
import { useEffect } from "react";

type Props = {
  solution: Solution;
};

const Wordle = ({ solution }: Props) => {
  const { guess, handleKeyUp, guesses, isCorrect, turn } = useWordle(
    solution.word
  );

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
    </>
  );
};

export default Wordle;
