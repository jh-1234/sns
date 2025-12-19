import type { Theme } from "@/types/common";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

type State = {
  theme: Theme;
};

const init: State = {
  theme: "light",
};

const useThemeStore = create(
  persist(
    combine(init, (set) => ({
      actions: {
        setTheme: (theme: Theme) => {
          const htmlTag = document.documentElement;
          htmlTag.classList.remove("dark", "light");

          if (theme === "system") {
            const isDarkTheme = window.matchMedia(
              "(prefers-color-scheme: dark)",
            ).matches;

            htmlTag.classList.add(isDarkTheme ? "dark" : "light");
          } else {
            htmlTag.classList.add(theme);
          }

          set({ theme });
        },
      },
    })),
    {
      name: "themeStore",
      partialize: (store) => ({
        theme: store.theme,
      }),
    },
  ),
);

export const useTheme = () => {
  const theme = useThemeStore((store) => store.theme);

  return theme;
};

export const useSetTheme = () => {
  const setTheme = useThemeStore((store) => store.actions.setTheme);

  return setTheme;
};
