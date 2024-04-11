import { emptyArray } from "@/constants/guess";
import { FormattedGuess } from "@/types/wordleTypes";

type Props = {
  guess: FormattedGuess[];
  currentGuess?: string;
};

const Row = ({ guess, currentGuess }: Props) => {
  if (guess) {
    return (
      <div className="row">
        {guess.map((letter, index) => (
          <div
            key={`${letter}-${index}`}
            className={`${letter.color} text-white`}
          >
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    return (
      <div className="row current">
        {emptyArray.map((value, index) => (
          <div key={index} className={currentGuess[index] && "filled"}>
            {currentGuess[index]}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      {emptyArray.map((value, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
};

export default Row;
