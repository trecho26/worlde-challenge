import { useStore } from "@/store";
import CountDown from "./CountDown";
import { useMetaDataStore } from "@/store/metaData";
import { Duration } from "luxon";

type Props = {
  onClick: () => void;
};

const duration = Duration.fromObject({ minutes: 1 });

const DialogStatsContent = ({ onClick }: Props) => {
  const { isCorrect, solution, guesses } = useStore();
  const { roundEnded, rounds, victories } = useMetaDataStore();
  return (
    <>
      <h3 className="font-bold text-3xl text-center">Estadísticas</h3>
      <div className="flex justify-between my-3">
        <div className="flex flex-col items-center justify-center">
          <span className="block font-bold text-xl">{rounds}</span>
          <span className="block">Juagadas</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="block font-bold text-xl">{victories}</span>
          <span className="block">Victorias</span>
        </div>
      </div>
      {roundEnded && guesses.filter((g) => g).length > 0 && (
        <>
          {!isCorrect && (
            <p className="my-3">
              La palabra era:{" "}
              <span className="font-bold uppercase">{solution.word}</span>
            </p>
          )}
          <p className="my-3 text-center text-sm">SIGUIENTE PALABRA</p>
          <CountDown init={roundEnded} duration={duration} />
        </>
      )}
    </>
  );
};

export default DialogStatsContent;
