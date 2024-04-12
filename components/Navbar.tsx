import Image from "next/image";
import { useStore } from "@/store";

const Navbar = () => {
  const { setInstructionsOpen } = useStore();
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl max-w-[500px] my-[20px] mx-auto">
      <Image
        src="./question_icon.svg"
        width={24}
        height={24}
        alt="Instructions"
        role="button"
        onClick={() => setInstructionsOpen(true)}
      />
      <h1 className="font-bold text-3xl tracking-widest	">WORDLE</h1>
      <Image
        src="./chart_icon.svg"
        width={34}
        height={34}
        alt="Results"
        role="button"
      />
    </div>
  );
};

export default Navbar;
