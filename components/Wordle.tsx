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

const Wordle = () => {
  const {
    isCorrect,
    turn,
    instructionsIsOpen,
    statsIsOpen,
    setStatsOpen,
    setInstructionsOpen,
  } = useStore();
  const { handleKeyUp } = useWordle();
  const {
    roundEnded,
    setFirstTime,
    increaseRounds,
    increaseVictories,
    setRoundEnded,
  } = useMetaDataStore();

  const handleEventListener = (e: KeyboardEvent) => {
    handleKeyUp(e.key);
  };

  const handleStartGame = () => {
    setInstructionsOpen(false);
    setFirstTime(false);
  };

  const finishSession = () => {
    setRoundEnded(DateTime.local().toISO());
    increaseRounds();
    setStatsOpen(true);
    if (isCorrect) {
      increaseVictories();
    }
  };

  const handleCloseStats = () => {
    if (roundEnded) return;

    setStatsOpen(false);
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
      <Navbar />
      <Grid />
      <Keyboard />
      <Dialog
        open={instructionsIsOpen}
        onClose={() => setInstructionsOpen(false)}
      >
        <DialogHelpContent onClick={handleStartGame} />
      </Dialog>
      <Dialog open={statsIsOpen} onClose={handleCloseStats}>
        <DialogStatsContent onClick={() => setStatsOpen(false)} />
      </Dialog>
    </>
  );
};

export default Wordle;
