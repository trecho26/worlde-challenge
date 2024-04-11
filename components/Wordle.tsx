import useWordle from "@/hooks/useWordle";
import { useStore } from "@/store";
import { useEffect } from "react";
import Grid from "./Grid";

const Wordle = () => {
  const { solution, guess, guesses, isCorrect, turn } = useStore();
  const { handleKeyUp } = useWordle();

  const handleEventListener = (e: KeyboardEvent) => {
    handleKeyUp(e.key);
  };

  useEffect(() => {
    if (!window) return;

    window.addEventListener("keyup", handleEventListener);

    if (isCorrect) {
      console.log("Congrats!");
      window.removeEventListener("keyup", handleEventListener);
      return;
    }

    if (turn > 5) {
      console.log("Out of turns");
      window.removeEventListener("keyup", handleEventListener);
      return;
    }

    return () => {
      window.removeEventListener("keyup", handleEventListener);
    };
  }, [handleKeyUp]);

  return (
    <>
      <div>Solution - {solution.word}</div>
      <div>current guess - {guess}</div>
      <Grid />
    </>
  );
};

export default Wordle;
