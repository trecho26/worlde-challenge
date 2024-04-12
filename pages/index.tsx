import { Inter } from "next/font/google";
import { useEffect } from "react";
import { words } from "@/public/words";
import Wordle from "@/components/Wordle";
import { Solution } from "@/types/wordleTypes";
import Navbar from "@/components/Navbar";
import { useStore } from "@/store";
import Keyboard from "@/components/Keyboard";
import Dialog from "@/components/Dialog";
import useLocalStorage from "@/hooks/useLocalStorage";
import { DateTime } from "luxon";
import DialogHelpContent from "@/components/DialogHelpContent";
import DialogStatsContent from "@/components/DialogStatsContent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    solution,
    instructionsIsOpen,
    statsIsOpen,
    lastPlay,
    setSolution,
    setInstructionsOpen,
    setStatsOpen,
    setLastPlay,
  } = useStore();
  const { setValue, getValue } = useLocalStorage();

  const handleStartGame = () => {
    if (lastPlay) {
      setInstructionsOpen(false);
      return;
    }

    const currDate = DateTime.local().toISO();
    setValue("lastPlay", currDate);
    setLastPlay(currDate);
  };

  useEffect(() => {
    setLastPlay(getValue("lastPlay") || null);
  }, []);

  useEffect(() => {
    if (!lastPlay) {
      setInstructionsOpen(true);
    } else {
      setInstructionsOpen(false);
    }

    const randomSolution: Solution =
      words[Math.floor(Math.random() * words.length - 1)];

    setSolution(randomSolution);
  }, [setSolution, lastPlay]);

  return (
    <main className={`${inter.className} w-[90%] mx-auto my-0`}>
      <Navbar />
      {solution && <Wordle />}
      <Keyboard />
      <Dialog
        open={instructionsIsOpen}
        onClose={() => setInstructionsOpen(false)}
      >
        <DialogHelpContent onClick={handleStartGame} />
      </Dialog>
      <Dialog open={statsIsOpen} onClose={() => setStatsOpen(false)}>
        <DialogStatsContent onClick={() => setStatsOpen(false)} />
      </Dialog>
    </main>
  );
}
