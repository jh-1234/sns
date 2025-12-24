import { Outlet } from "react-router";
import ThemeButton from "./header/ThemeButton";
import ProfileButton from "./header/ProfileButton";
import LogoButton from "./header/LogoButton";

const GlobalLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-15 border-b bg-blue-200 dark:border-slate-700 dark:bg-[#1e293b]">
        <div className="m-auto flex h-full w-full max-w-250 justify-between px-4">
          <LogoButton />

          <div className="flex items-center gap-3">
            <ThemeButton />
            <ProfileButton />
          </div>
        </div>
      </header>

      <main className="m-auto w-full max-w-250 flex-1 border-x px-4 py-6">
        <Outlet />
      </main>

      <footer className="text-muted-foreground border-t py-10 text-center">
        @study
      </footer>
    </div>
  );
};

export default GlobalLayout;
