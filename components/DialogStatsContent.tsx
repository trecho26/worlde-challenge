import { useStore } from "@/store";
import CountDown from "./CountDown";
import { useMetaDataStore } from "@/store/metaData";
import { Duration } from "luxon";
import { useState } from "react";

type Props = {
  onClick: () => void;
};

const duration = Duration.fromObject({ minutes: 5 });

const DialogStatsContent = ({ onClick }: Props) => {
  const { isCorrect, solution, guesses } = useStore();
  const { roundEnded, rounds, victories } = useMetaDataStore();
  const [isDisabled, setIsDisabled] = useState(true);

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
          {!isCorrect ? (
            <p className="my-3">
              La palabra era:{" "}
              <span className="font-bold uppercase">{solution.word}</span>
            </p>
          ) : (
            <p className="my-3 text-center text-green-500 font-semibold">
              !FELICIDADES¡
            </p>
          )}
          <p className="text-center text-sm">SIGUIENTE PALABRA</p>

          <CountDown
            init={roundEnded}
            duration={duration}
            onTimeOut={() => setIsDisabled(false)}
          />
          <div className="flex justify-center mt-3">
            <button
              onClick={onClick}
              disabled={isDisabled}
              className="bg-wordGreen text-white font-semibold rounded w-1/2 py-1 disabled:opacity-50"
            >
              Aceptar
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default DialogStatsContent;
