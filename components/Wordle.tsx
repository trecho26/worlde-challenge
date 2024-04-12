import useWordle from "@/hooks/useWordle";
import { useStore } from "@/store";
import { useEffect } from "react";
import Grid from "./Grid";
import Keyboard from "@/components/Keyboard";
import Dialog from "@/components/Dialog";
import DialogHelpContent from "@/components/DialogHelpContent";
import DialogStatsContent from "@/components/DialogStatsContent";
import Navbar from "@/components/Navbar";
import { useMetaDataStore } from "@/store/metaData";
import { DateTime } from "luxon";
import { getRandomSolution } from "@/utils/solution";
import Alert from "./Alert";

const Wordle = () => {
  const {
    solution,
    isCorrect,
    turn,
    instructionsIsOpen,
    statsIsOpen,
    alert,
    setSolution,
    setStatsOpen,
    setInstructionsOpen,
    setAlert,
    reset,
  } = useStore();
  const { handleKeyUp } = useWordle();
  const {
    wordsUsed,
    setFirstTime,
    increaseRounds,
    increaseVictories,
    setRoundEnded,
    setWordsUsed,
  } = useMetaDataStore();

  const handleEventListener = (e: KeyboardEvent) => {
    handleKeyUp(e.key);
  };

  const handleStartGame = () => {
    setInstructionsOpen(false);
    setFirstTime(false);
  };

  const handleNextGame = () => {
    setStatsOpen(false);
    setRoundEnded(null);
    setWordsUsed(solution.word);
    reset();
    const randomSolution = getRandomSolution(wordsUsed);
    setSolution(randomSolution);
  };

  const finishSession = () => {
    setRoundEnded(DateTime.local().toISO());
    increaseRounds();
    setStatsOpen(true);
    if (isCorrect) {
      increaseVictories();
    }
  };

  useEffect(() => {
    if (!window) return;

    window.addEventListener("keyup", handleEventListener);

    return () => {
      window.removeEventListener("keyup", handleEventListener);
    };
  }, [handleKeyUp]);

  useEffect(() => {
    if (!window) return;

    if (isCorrect) {
      console.log("Congrats!");
      finishSession();
      window.removeEventListener("keyup", handleEventListener);
      return;
    }

    if (turn > 5) {
      console.log("Out of turns");
      finishSession();
      window.removeEventListener("keyup", handleEventListener);
      return;
    }

    return () => {
      window.removeEventListener("keyup", handleEventListener);
    };
  }, [turn, isCorrect]);

  return (
    <>
      <Alert
        isOpen={alert.isOpen}
        message={alert.message}
        severity={alert.severity}
        onClose={() => {
          setAlert({ ...alert, isOpen: false });
        }}
        duration={2000}
      />
      <Navbar />
      <Grid />
      <Keyboard />
      <Dialog
        open={instructionsIsOpen}
        onClose={() => setInstructionsOpen(false)}
      >
        <DialogHelpContent onClick={handleStartGame} />
      </Dialog>
      <Dialog open={statsIsOpen} onClose={() => setStatsOpen(false)}>
        <DialogStatsContent onClick={handleNextGame} />
      </Dialog>
    </>
  );
};

export default Wordle;
