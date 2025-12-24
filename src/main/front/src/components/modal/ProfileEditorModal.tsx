import { useSession, useSetSession } from "@/store/Session";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import defaultProfile from "@/assets/default_profile.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useProfileEditorModal } from "@/store/ProfileEditorModal";
import DatePicker from "../common/DatePicker";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import { Camera } from "lucide-react";
import type { Image } from "@/types/common";
import { useUserInfoUpdate } from "@/hooks/useAuth";
import { toast } from "sonner";
import axios from "axios";
import { axiosErrorMessageFormat } from "@/utils/errorUtil";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";

const ProfileEditorModal = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  const setSession = useSetSession();

  const {
    isOpen,
    actions: { close },
  } = useProfileEditorModal();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState<Date | undefined>(undefined);
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState<Image | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (profileImage) {
      URL.revokeObjectURL(profileImage.previewUrl);
    }

    setProfileImage({
      file,
      previewUrl: URL.createObjectURL(file),
    });
  };

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setTel(formattedNumber);
  };

  useEffect(() => {
    if (!isOpen) {
      if (profileImage) URL.revokeObjectURL(profileImage.previewUrl);

      setName("");
      setPassword("");
      setTel("");
      setEmail("");
      setBirthday(undefined);
      setGender("");
      setProfileImage(null);

      return;
    }

    if (session) {
      setName(session.name);
      setTel(session.tel);
      setEmail(session.email || "");
      setBirthday(session.birthday);
      setGender(session.gender);
      setProfileImage(null);
    }
  }, [isOpen, session]);

  const { mutate: userInfoUpdate } = useUserInfoUpdate();

  const handleUpdate = () => {
    const data = {
      name,
      password,
      tel,
      email,
      birthday,
      gender,
    };

    const image = profileImage?.file || undefined;

    userInfoUpdate(
      { data, image },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.user.all,
          });

          queryClient.invalidateQueries({
            queryKey: session?.uuid
              ? QUERY_KEYS.post.user(session.uuid)
              : QUERY_KEYS.post.users,
          });

          const newSession = res.data;
          setSession(newSession);

          toast.success("수정되었습니다", {
            position: "top-center",
          });

          close();
        },
        onError: (e) => {
          if (axios.isAxiosError(e)) {
            alert(axiosErrorMessageFormat(e));
          }
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-4">
        <DialogTitle>프로필 수정</DialogTitle>
        <DialogDescription></DialogDescription>
        <div
          className="flex flex-col items-center gap-2"
          onClick={() => {
            if (fileInputRef.current) fileInputRef.current.click();
          }}
        >
          <div className="relative cursor-pointer">
            <input
              ref={fileInputRef}
              onChange={handleSelectImage}
              type="file"
              accept="image/*"
              className="hidden"
            />
            <img
              src={
                profileImage?.previewUrl ||
                session?.profileUrl ||
                defaultProfile
              }
              alt="profile"
              className="border-muted h-28 w-28 cursor-pointer rounded-full border-2 object-cover"
            />
            <div className="absolute right-0 bottom-0 rounded-full border-2 border-white bg-gray-300 p-1.5 shadow-sm transition-transform group-hover:scale-110">
              <Camera className="text-primary-foreground h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-muted-foreground w-20 shrink-0">이름</div>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="text-muted-foreground w-20 shrink-0">아이디</div>
          <Input type="text" value={session?.userId} disabled={true} />
        </div>

        <div className="flex items-center gap-2">
          <div className="text-muted-foreground w-20 shrink-0">비밀번호</div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="text-muted-foreground w-20 shrink-0">연락처</div>
          <Input type="tel" value={tel} onChange={handleTelChange} />
        </div>

        <div className="flex items-center gap-2">
          <div className="text-muted-foreground w-20 shrink-0">이메일</div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="text-muted-foreground w-20 shrink-0">생년월일</div>
          <div className="flex-1">
            <DatePicker
              date={birthday}
              setDate={setBirthday}
              placeholder="생년월일"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 py-2">
          <Label
            htmlFor="gender"
            className="text-muted-foreground w-20 shrink-0"
          >
            성별
          </Label>
          <RadioGroup
            id="gender"
            className="mt-2 flex space-x-4"
            value={gender}
            onValueChange={setGender}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="M" id="male" />
              <Label htmlFor="male">남자</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="F" id="female" />
              <Label htmlFor="female">여자</Label>
            </div>
          </RadioGroup>
        </div>

        <Button onClick={handleUpdate} className="cursor-pointer">
          수정하기
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditorModal;
