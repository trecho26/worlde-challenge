import { letters } from "@/constants/guess";
import { useStore } from "@/store";
import { UsedKeys } from "@/types/wordleTypes";
import clsx from "clsx";
import { useEffect, useState } from "react";

// let lastGuessEntered = {};

const Keyboard = () => {
  const { guesses } = useStore();
  const [usedKeys, setUsedKeys] = useState<UsedKeys>({});

  useEffect(() => {
    const cleanGuesses = guesses.filter((g) => g);
    if (cleanGuesses.length === 0) return;

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
    <div className="max-w-[500px] my-[20px] mx-auto text-center">
      {letters.map((letter, index) => (
        <div
          className={clsx(
            "m-1 w-10 h-12 bg-gray-200 inline-block rounded leading-[3rem] uppercase ",
            {
              "bg-wordGreen text-white transition-all duration-[0.5s] ease-in-out":
                usedKeys[letter] === "green",
              "bg-wordYellow text-white transition-all duration-[0.5s] ease-in-out":
                usedKeys[letter] === "yellow",
              "bg-wordGrey text-white transition-all duration-[0.5s] ease-in-out":
                usedKeys[letter] === "grey",
            }
          )}
          key={`${letter}-${index}`}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
