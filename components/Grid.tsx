import { useStore } from "@/store";
import Row from "./Row";

const Grid = () => {
  const { guesses } = useStore();
  return (
    <div>
      {guesses.map((guess, index) => (
        <Row key={index} guess={guess} />
      ))}
    </div>
  );
};

export default Grid;
