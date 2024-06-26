import { useState, useEffect } from "react";

const useCountDown = (targetDate: string) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (countDown <= 0) {
      setIsFinished(true);
      return;
    }

    const interval = setInterval(() => {
      const diff = countDownDate - new Date().getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setIsFinished(true);
        return;
      }

      setCountDown(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return { ...getReturnValues(Math.max(countDown, 0)), isFinished };
};

const getReturnValues = (countDown: number) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
};

export default useCountDown;
