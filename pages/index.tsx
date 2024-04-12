import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { words } from "@/public/words";
import Wordle from "@/components/Wordle";
import { Solution } from "@/types/wordleTypes";
import Navbar from "@/components/Navbar";
import { useStore } from "@/store";
import Keyboard from "@/components/Keyboard";
import Dialog from "@/components/Dialog/Dialog";
import useLocalStorage from "@/hooks/useLocalStorage";
import { DateTime } from "luxon";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    solution,
    instructionsIsOpen,
    lastPlay,
    setSolution,
    setInstructionsOpen,
    setLastPlay,
  } = useStore();
  const { setValue, getValue } = useLocalStorage();

  const handleStartGame = () => {
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
        onClick={handleStartGame}
      />
    </main>
  );
}
