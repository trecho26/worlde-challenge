import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { words } from "@/public/words";
import Wordle from "@/components/Wordle";
import { Solution } from "@/types/wordleTypes";
import Navbar from "@/components/Navbar";
import { useStore } from "@/store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { solution, setSolution } = useStore();

  useEffect(() => {
    const randomSolution: Solution =
      words[Math.floor(Math.random() * words.length - 1)];

    setSolution(randomSolution);
  }, []);

  return (
    <main className={inter.className}>
      <Navbar />
      {solution && <Wordle />}
    </main>
  );
}
