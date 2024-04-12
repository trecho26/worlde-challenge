import Image from "next/image";
import { useStore } from "@/store";
import ThemeSwitcher from "./ThemeSwitcher";
import HelpIcon from "./icons/HelpIcon";
import StatsIcon from "./icons/StatsIcon";

const Navbar = () => {
  const { setInstructionsOpen, setStatsOpen } = useStore();
  return (
    <div className="flex items-center bg-[#F3F3F3] dark:bg-[#DADCE008] p-4 rounded-xl max-w-[500px] my-[20px] mx-auto">
      <div className="flex items-center gap-2 min-w-[90px] min-h-[32px]">
        <HelpIcon
          className="w-6 h-6 text-[#818181] dark:text-white"
          role="button"
          onClick={() => setInstructionsOpen(true)}
        />
      </div>
      <h1 className="flex-1 text-center font-bold text-3xl tracking-widest dark:text-white">
        WORDLE
      </h1>
      <div className="flex items-center gap-2 min-w-[90px] min-h-[32px]">
        <StatsIcon
          className="w-6 h-6 text-[#818181] dark:text-white"
          role="button"
          onClick={() => setStatsOpen(true)}
        />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
