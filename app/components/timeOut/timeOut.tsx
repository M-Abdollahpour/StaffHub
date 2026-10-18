import { useEffect, useState } from "react";
import { useTimerStore } from "~/stores/useTimerStore";

const getRemaining = (endTime: number | null) =>
  endTime === null ? 0 : Math.max(0, Math.ceil((endTime - Date.now()) / 1000));

const TimeOut = () => {
  const endTime = useTimerStore((state) => state.endTime);
  const [remaining, setRemaining] = useState(() => getRemaining(endTime));

  useEffect(() => {
    setRemaining(getRemaining(endTime));
    const id = setInterval(() => setRemaining(getRemaining(endTime)), 1000);
    return () => clearInterval(id);
  }, [endTime]);

  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");

  return (
    <span
      className={`w-20 min-h-10 md:text-base text-sm md:font-bold border border-[#002140]/50 text-[#002140] rounded-lg flex justify-center items-center tabular-nums ${remaining < 60 ? "font-semibold text-red-600 border-red-600/50" : ""}`}
    >
      {minutes}:{seconds}
    </span>
  );
};
export default TimeOut;
