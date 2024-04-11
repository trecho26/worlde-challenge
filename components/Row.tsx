import { FormattedGuess } from "@/types/wordleTypes";
import clsx from "clsx";

type Props = {
  guess: FormattedGuess[];
};

const emptyRowArr = [1, 2, 3, 4, 5];

const Row = ({ guess }: Props) => {
  return (
    <div className="flex text-center justify-center">
      {guess ? (
        <>
          {guess.map((letter, index) => (
            <div
              key={`${letter}-${index}`}
              className={clsx(
                "h-16 w-16 border border-gray-200 m-1 text-center leading-[4rem] uppercase font-bold text-3xl rounded select-none text-white",
                {
                  "bg-wordGreen": letter.color === "green",
                  "bg-wordYellow": letter.color === "yellow",
                  "bg-wordGrey": letter.color === "grey",
                }
              )}
            >
              {letter.key}
            </div>
          ))}
        </>
      ) : (
        <>
          {emptyRowArr.map((value) => (
            <div
              key={value}
              className="h-16 w-16 border border-gray-200 m-1 text-center leading-[4rem] uppercase font-bold text-3xl rounded select-none"
            ></div>
          ))}
        </>
      )}
    </div>
  );
};

export default Row;
