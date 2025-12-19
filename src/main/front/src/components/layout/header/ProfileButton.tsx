import defaultProfile from "@/assets/default-profile.png";
import { useEffect, useRef, useState } from "react";
import { useLogout } from "@/hooks/useAuth";
import { Link } from "react-router";

const ProfileButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className="relative" ref={menuRef}>
      <img
        className="h-12 w-12 cursor-pointer rounded-full border bg-white object-cover hover:opacity-80 dark:border-slate-700"
        src={defaultProfile}
        alt="profile"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

      {isMenuOpen && (
        <div className="absolute z-50 mt-2 w-40 overflow-hidden rounded-lg border bg-white shadow-lg ring-0 dark:border-slate-700 dark:bg-[#1e293b]">
          <div className="flex flex-col">
            <Link
              to={"/profile"}
              className="px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              내 정보
            </Link>
            <button
              className="px-4 py-3 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
