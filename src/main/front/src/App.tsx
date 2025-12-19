import { Toaster } from "sonner";
import "./App.css";
import SessionFilter from "./filters/SessionFilter";
import ModalProvider from "./provider/ModalProvider";
import RootRoute from "./RootRoute";
import { useLocation } from "react-router";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    try {
      const themeStore = localStorage.getItem("themeStore");
      const themeParse = themeStore ? JSON.parse(themeStore) : null;
      const theme = themeParse.state.theme;

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
    } catch (e) {
      console.error(e);
    }
  }, [location.pathname]);

  return (
    <SessionFilter>
      <ModalProvider>
        <RootRoute />
      </ModalProvider>
      <Toaster position="top-center" richColors />
    </SessionFilter>
  );
}

export default App;
