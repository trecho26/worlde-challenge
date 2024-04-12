import useCountDown from "@/hooks/useCountDown";
import { DateTime, Duration } from "luxon";

type Props = {
  init: string;
  duration: Duration<true>;
};

const CountDown = ({ init, duration }: Props) => {
  const { minutes, seconds } = useCountDown(
    DateTime.fromISO(init || "")
      .plus(duration)
      .toISO() || ""
  );
  return (
    <p>
      {minutes}:{seconds}
    </p>
  );
};

export default CountDown;
