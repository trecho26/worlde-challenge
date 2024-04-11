import useWordle from "@/hooks/useWordle";
import { Solution } from "@/types/wordleTypes";
import { useEffect } from "react";

type Props = {
  solution: Solution;
};

const Wordle = ({ solution }: Props) => {
  const { guess, handleKeyUp } = useWordle(solution.word);

  useEffect(() => {
    if (!window) return;

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return <div>current guess - {guess}</div>;
};

export default Wordle;
