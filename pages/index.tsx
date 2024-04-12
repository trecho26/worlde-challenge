import { Inter } from "next/font/google";
import { useEffect } from "react";
import Wordle from "@/components/Wordle";
import { useStore } from "@/store";
import { useMetaDataStore } from "@/store/metaData";
import { getRandomSolution } from "../utils/solution";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { setSolution, setInstructionsOpen } = useStore();
  const { firstTime, wordsUsed } = useMetaDataStore();

  useEffect(() => {
    setInstructionsOpen(firstTime);

    if (firstTime) return;

    const randomSolution = getRandomSolution(wordsUsed);

    setSolution(randomSolution);
  }, [setSolution, firstTime]);

  return (
    <main className={`${inter.className} w-[90%] mx-auto my-0`}>
      <Wordle />
    </main>
  );
}
