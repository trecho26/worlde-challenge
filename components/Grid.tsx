import { useStore } from "@/store";
import Row from "./Row";

const Grid = () => {
  const { guess, guesses, turn } = useStore();
  return (
    <div>
      {guesses.map((pGuess, index) => {
        if (index === turn - 1) {
          return <Row key={index} guess={pGuess} currentGuess={guess} />;
        }

        return <Row key={index} guess={pGuess} />;
      })}
    </div>
  );
};

export default Grid;
