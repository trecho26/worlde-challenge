import { FormattedGuess } from "@/types/wordleTypes";
import clsx from "clsx";

type Props = {
  guess: FormattedGuess[];
  currentGuess?: string;
};

const emptyRowArr = [1, 2, 3, 4, 5];

const Row = ({ guess, currentGuess }: Props) => {
  if (guess) {
    return (
      <div className="flex text-center justify-center">
        {guess.map((letter, index) => (
          <div
            key={`${letter}-${index}`}
            className={clsx(
              "h-16 w-16 border border-gray-200 m-1 text-center leading-[4rem] uppercase font-bold text-3xl rounded select-none text-white",
              {
                "bg-wordGreen border-wordGreen": letter.color === "green",
                "bg-wordYellow border-wordYellow": letter.color === "yellow",
                "bg-wordGrey border-wordGrey": letter.color === "grey",
              }
            )}
          >
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    return (
      <div className="flex text-center justify-center">
        {[...Array(5)].map((letter, index) => (
          <div
            key={`${letter}-${index}`}
            className="h-16 w-16 border border-gray-200 m-1 text-center leading-[4rem] uppercase font-bold text-3xl rounded select-none"
          >
            {currentGuess[index]}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex text-center justify-center">
      {emptyRowArr.map((value) => (
        <div
          key={value}
          className="h-16 w-16 border border-gray-200 m-1 text-center leading-[4rem] uppercase font-bold text-3xl rounded select-none"
        ></div>
      ))}
    </div>
  );
};

export default Row;
