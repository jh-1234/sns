import { useUserInfo } from "@/hooks/useAuth";
import Fallback from "../common/Fallback";
import Loader from "../common/Loader";
import defaultProfile from "@/assets/default_profile.png";
import { useSession } from "@/store/Session";
import EditProfileButton from "./EditProfileButton";

const ProfileInfo = ({ uuid }: { uuid: string }) => {
  const { data: profile, error, isPending } = useUserInfo(uuid);
  const session = useSession();

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  const isMine = session?.uuid === uuid;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="transition-hover flex cursor-pointer items-center justify-center rounded-full bg-gray-100 p-1 shadow-sm hover:bg-gray-50 dark:bg-slate-300">
        <img
          src={profile.profileUrl || defaultProfile}
          className="h-30 w-30 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">{profile.name}</div>
      </div>
      {isMine && <EditProfileButton />}
    </div>
  );
};

export default ProfileInfo;
