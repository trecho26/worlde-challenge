import { words } from "@/public/words";
import { Solution } from "@/types/wordleTypes";

export const getRandomSolution = (wordsUsed: string[]): Solution => {
  const filteredWords = words.filter((word) => !wordsUsed.includes(word.word));

  return filteredWords[Math.floor(Math.random() * filteredWords.length - 1)];
};
