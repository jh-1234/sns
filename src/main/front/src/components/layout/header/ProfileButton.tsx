import defaultProfile from "@/assets/default_profile.png";
import { useLogout } from "@/hooks/useAuth";
import { Link } from "react-router";
import { useSession } from "@/store/Session";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

const ProfileButton = () => {
  const session = useSession();

  if (!session) return null;

  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="transition-hover flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 dark:bg-slate-300">
          <img
            className="h-full w-full cursor-pointer rounded-full object-cover"
            src={session.profileUrl || defaultProfile}
            alt="profile"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex w-40 flex-col p-0">
        <PopoverClose asChild>
          <Link to={`/profile/${session?.uuid}`}>
            <div className="hover:bg-muted cursor-pointer px-4 py-3 text-sm">
              내정보
            </div>
          </Link>
        </PopoverClose>
        <PopoverClose asChild>
          <button
            onClick={handleLogout}
            className="hover:bg-muted cursor-pointer px-4 py-3 text-left text-sm text-red-600"
          >
            로그아웃
          </button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileButton;
