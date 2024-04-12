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
import { useMetaDataStore } from "@/store/metaData";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    solution,
    instructionsIsOpen,
    statsIsOpen,
    setSolution,
    setInstructionsOpen,
    setStatsOpen,
  } = useStore();
  const { firstTime, setFirstTime } = useMetaDataStore();

  const handleStartGame = () => {
    if (firstTime) {
      setInstructionsOpen(false);
      return;
    }

    setFirstTime(true);
  };

  useEffect(() => {
    if (!firstTime) {
      setInstructionsOpen(true);
      return;
    }

    setInstructionsOpen(false);

    const randomSolution: Solution =
      words[Math.floor(Math.random() * words.length - 1)];

    setSolution(randomSolution);
  }, [setSolution, firstTime]);

  return (
    <main className={`${inter.className} w-[90%] mx-auto my-0`}>
      <Navbar />
      <Wordle />
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
