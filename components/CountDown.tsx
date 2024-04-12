import useCountDown from "@/hooks/useCountDown";
import { DateTime, Duration } from "luxon";
import { useEffect } from "react";

type Props = {
  init: string;
  duration: Duration<true>;
  onTimeOut?: () => void;
};

const CountDown = ({ init, duration, onTimeOut }: Props) => {
  const { minutes, seconds, isFinished } = useCountDown(
    DateTime.fromISO(init || "")
      .plus(duration)
      .toISO() || ""
  );

  useEffect(() => {
    if (isFinished && onTimeOut) {
      onTimeOut();
    }
  }, [isFinished]);

  return (
    <p className="text-center font-semibold text-xl">
      {minutes}:{seconds}
    </p>
  );
};

export default CountDown;
