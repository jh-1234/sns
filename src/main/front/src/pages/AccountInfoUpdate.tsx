import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AccountInfoUpdate = () => {
  return (
    <div className="z-10 flex w-100 flex-col gap-4 rounded-2xl bg-white/70 p-6 shadow-xl">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">비밀번호 재설정</div>
        <div className="text-muted-foreground">
          이메일로 인증 링크를 보내드립니다.
        </div>
      </div>
      <Input className="py-6" placeholder="E-Mail" />
      <div className="flex flex-col gap-2">
        <Button className="w-full cursor-pointer">수정하기</Button>
        <Button className="w-full cursor-pointer bg-gray-300 text-gray-800 hover:bg-gray-400">
          취소
        </Button>
      </div>
    </div>
  );
};

export default AccountInfoUpdate;
