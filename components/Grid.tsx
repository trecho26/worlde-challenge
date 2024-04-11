import { useStore } from "@/store";
import Row from "./Row";

const Grid = () => {
  const { guesses } = useStore();
  return (
    <div>
      {guesses.map((guess, index) => (
        <Row key={index} />
      ))}
    </div>
  );
};

export default Grid;
