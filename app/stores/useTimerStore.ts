import { create } from "zustand";
import { persist } from "zustand/middleware";
type TimerState = {
  endTime: number | null;
  start: (seconds?: number) => void;
  reset: () => void;
};
export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      endTime: null,
      start: (seconds = 60) => {
        set({ endTime: Date.now() + seconds * 1000 });
      },
      reset: () => set({ endTime: null }),
    }),
    {
      name: "timer-storage",
    },
  ),
);
