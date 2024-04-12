import { Inter } from "next/font/google";
import { useEffect } from "react";
import { words } from "@/public/words";
import Wordle from "@/components/Wordle";
import { Solution } from "@/types/wordleTypes";
import { useStore } from "@/store";
import { useMetaDataStore } from "@/store/metaData";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { setSolution, setInstructionsOpen } = useStore();
  const { firstTime } = useMetaDataStore();

  useEffect(() => {
    setInstructionsOpen(firstTime);

    if (firstTime) return;

    const randomSolution: Solution =
      words[Math.floor(Math.random() * words.length - 1)];

    setSolution(randomSolution);
  }, [setSolution, firstTime]);

  return (
    <main className={`${inter.className} w-[90%] mx-auto my-0`}>
      <Wordle />
    </main>
  );
}
