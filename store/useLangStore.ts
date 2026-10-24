import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "ka" | "en";

interface LangStore {
  lang: Language;
  toggleLang: () => void;
}

export const useLangStore = create<LangStore>()(
  persist(
    (set) => ({
      lang: "ka",
      toggleLang: () =>
        set((state) => ({ lang: state.lang === "ka" ? "en" : "ka" })),
    }),
    { name: "language-storage" },
  ),
);
