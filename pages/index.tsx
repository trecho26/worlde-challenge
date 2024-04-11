import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { words } from "@/public/words";
import Wordle from "@/components/Wordle";
import { Solution } from "@/types/wordleTypes";
import Navbar from "@/components/Navbar";
import { useStore } from "@/store";
import Keyboard from "@/components/Keyboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { solution, setSolution } = useStore();

  useEffect(() => {
    const randomSolution: Solution =
      words[Math.floor(Math.random() * words.length - 1)];

    setSolution(randomSolution);
  }, [setSolution]);

  return (
    <main className={`${inter.className} w-[90%] mx-auto my-0`}>
      <Navbar />
      {solution && <Wordle />}
      <Keyboard />
    </main>
  );
}
