import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

const ForgetPassword = () => {
  return (
    <div className="z-10 flex w-100 flex-col gap-4 rounded-2xl bg-white/70 p-6 shadow-xl dark:bg-[rgba(15,23,42,0.8)]">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">비밀번호 재설정</div>
        <div className="text-muted-foreground">
          이메일로 인증 링크를 보내드립니다.
        </div>
      </div>
      <Input className="py-6" placeholder="E-Mail" />
      <div className="flex flex-col gap-2">
        <Button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600">
          인증 메일 요청
        </Button>

        <Link to={"/login"} className="w-full">
          <Button className="w-full cursor-pointer border border-gray-300 bg-gray-100/50 text-gray-700 hover:bg-gray-200 dark:border-slate-600 dark:bg-transparent dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200">
            취소
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
