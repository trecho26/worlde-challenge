import useCountDown from "@/hooks/useCountDown";
import { useStore } from "@/store";
import { useMetaDataStore } from "@/store/metaData";
import { DateTime, Duration } from "luxon";

type Props = {
  onClick: () => void;
};

const duration = Duration.fromObject({ minutes: 1 });

const DialogStatsContent = ({ onClick }: Props) => {
  const { isCorrect, solution } = useStore();
  const { roundEnded } = useMetaDataStore();
  const { minutes, seconds } = useCountDown(
    DateTime.fromISO(roundEnded || "")
      .plus(duration)
      .toISO() || ""
  );
  return (
    <>
      <h3 className="font-bold text-3xl text-center">Estadísticas</h3>
      <div className="flex justify-between my-3">
        <div className="flex flex-col items-center justify-center">
          <span className="block font-bold text-xl">8</span>
          <span className="block">Juagadas</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="block font-bold text-xl">2</span>
          <span className="block">Victorias</span>
        </div>
      </div>
      {!isCorrect && (
        <p className="my-3">
          La palabra era:{" "}
          <span className="font-bold uppercase">{solution.word}</span>
        </p>
      )}
      <p className="my-3 text-center text-sm">SIGUIENTE PALABRA</p>
      <p>
        {minutes}:{seconds}
      </p>
    </>
  );
};

export default DialogStatsContent;
