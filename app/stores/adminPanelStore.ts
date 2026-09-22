import { create } from "zustand";
import { persist } from "zustand/middleware";
const usePanelAdmin = create()(
  persist((set, get) => ({}), {
    name: "panel",
  }),
);
