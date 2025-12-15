import { Link, Outlet } from "react-router";
import logo from "@/assets/logo.png";
import defaultProfile from "@/assets/default-profile.png";
import { SunIcon } from "lucide-react";

const GlobalLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-15 border-b bg-blue-200">
        <div className="m-auto flex h-full w-full max-w-250 justify-between px-4">
          <Link to={"/"} className="flex items-center gap-2">
            <img className="h-10" src={logo} />
          </Link>
          <div className="flex items-center gap-5">
            <div className="hover:bg-muted cursor-pointer rounded-full p-2">
              <SunIcon />
            </div>
            <img className="h-12 rounded-full" src={defaultProfile} />
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
