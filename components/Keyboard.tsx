import { letters } from "@/constants/guess";
import { useStore } from "@/store";
import { UsedKeys } from "@/types/wordleTypes";
import clsx from "clsx";
import { useEffect, useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";
import useWordle from "@/hooks/useWordle";

const Keyboard = () => {
  const { handleKeyUp } = useWordle();
  const { guesses, isCorrect, turn } = useStore();
  const [usedKeys, setUsedKeys] = useState<UsedKeys>({});

  useEffect(() => {
    const cleanGuesses = guesses.filter((g) => g);
    if (cleanGuesses.length === 0) {
      setUsedKeys({});
      return;
    }

    let lastGuessEntered: UsedKeys = { ...usedKeys };

    cleanGuesses.slice(-1)[0].forEach((guess) => {
      let currentColor = lastGuessEntered[guess.key];

      if (guess.color === "green") {
        lastGuessEntered[guess.key] = "green";
        return;
      }

      if (guess.color === "yellow" && currentColor !== "green") {
        lastGuessEntered[guess.key] = "yellow";
        return;
      }

      if (
        guess.color === "grey" &&
        currentColor !== "green" &&
        currentColor !== "yellow"
      ) {
        lastGuessEntered[guess.key] = "grey";
        return;
      }
    });

    setUsedKeys(lastGuessEntered);
  }, [guesses]);

  return (
    <div className="max-w-[500px] my-[20px] mx-auto text-center select-none">
      {letters.map((letter, index) => (
        <button
          disabled={isCorrect || turn > 5}
          onClick={() => handleKeyUp(letter)}
          className={clsx(
            "m-1 w-10 h-12 bg-gray-200 inline-block rounded leading-[3rem] uppercase disabled:opacity-50",
            {
              "bg-wordGreen text-white transition-all duration-[0.5s] ease-in-out":
                usedKeys[letter] === "green",
              "bg-wordYellow text-white transition-all duration-[0.5s] ease-in-out":
                usedKeys[letter] === "yellow",
              "bg-wordGrey text-white transition-all duration-[0.5s] ease-in-out":
                usedKeys[letter] === "grey",
              "w-[fit-content] px-4 inline-flex justify-center items-center align-bottom":
                letter === "Enter" || letter === "Backspace",
            }
          )}
          key={`${letter}-${index}`}
        >
          {letter === "Backspace" ? <DeleteIcon /> : letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
