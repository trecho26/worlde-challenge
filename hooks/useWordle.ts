import { useStore } from "@/store";
import {
  ALERT_SEVERITY,
  FormattedGuess,
  GUESS_STATE,
} from "@/types/wordleTypes";
import { isLetter } from "@/utils/regex";

const useWordle = () => {
  const {
    solution,
    turn,
    guess,
    history,
    increaseTurn,
    setGuess,
    setGuesses,
    setHistory,
    setIsCorrect,
    setAlert,
  } = useStore();

  const formatGuess = () => {
    const solutionArr: (string | null)[] = solution.word.split("");
    const formattedGuess: FormattedGuess[] = guess.split("").map((letter) => {
      return {
        key: letter,
        color: GUESS_STATE.GREY,
      };
    });

    //Find any accurate letters
    formattedGuess.forEach((letter, index) => {
      if (solutionArr[index] === letter.key) {
        formattedGuess[index].color = GUESS_STATE.GREEN;
        solutionArr[index] = null;
      }
    });

    //Find letters that are on the solution but not in the correct order
    formattedGuess.forEach((letter, index) => {
      if (
        solutionArr.includes(letter.key) &&
        letter.color !== GUESS_STATE.GREEN
      ) {
        formattedGuess[index].color = GUESS_STATE.YELLOW;
        solutionArr[solutionArr.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addGuess = (formattedGuess: FormattedGuess[]) => {
    if (guess === solution.word) {
      setIsCorrect(true);
    }

    setGuesses(formattedGuess);

    setHistory(guess);

    increaseTurn();

    setGuess("");
  };

  const handleKeyUp = (key: string) => {
    if (turn > 5) {
      console.log("You used all your tuns");
      return;
    }

    if (key === "Enter") {
      //Only add new guess (not duplicate guesses)
      if (history.includes(guess)) {
        console.log("You already tried that word");
        setAlert({
          isOpen: true,
          message: "You already tried that word.",
          severity: ALERT_SEVERITY.WARNING,
        });
        return;
      }

      //Check if guess is 5 chars long
      if (guess.length !== 5) {
        console.log("Your guess must be 5 chars long");
        setAlert({
          isOpen: true,
          message: "Your guess must be 5 chars long.",
          severity: ALERT_SEVERITY.WARNING,
        });
        return;
      }

      const formattedGuess = formatGuess();
      addGuess(formattedGuess);
    }

    if (key === "Backspace") {
      setGuess(guess.slice(0, -1));
      return;
    }

    if (isLetter(key) && guess.length < 5) {
      setGuess(guess + key);
    }
  };

  return { handleKeyUp };
};

export default useWordle;
