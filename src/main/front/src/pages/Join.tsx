import DatePicker from "@/components/common/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import axios from "axios";
import { axiosErrorMessageFormat } from "@/utils/errorUtil";
import { useJoin } from "@/hooks/useAuth";

const Join = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState<Date | undefined>();
  const [gender, setGender] = useState("M");

  const { mutate: join, isPending } = useJoin();
  const navigate = useNavigate();

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setTel(formattedNumber);
  };

  const handleJoinClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "") {
      alert("이름을 입력해주세요.");
      return;
    }

    if (userId.trim() === "") {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (password.trim() === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (tel.trim() === "") {
      alert("연락처를 입력해주세요.");
      return;
    }

    if (!birthday) {
      alert("생년월일을 선택해주세요.");
      return;
    }

    const joinData = {
      name,
      userId,
      password,
      tel,
      email,
      birthday,
      gender,
    };

    join(joinData, {
      onSuccess: () => {
        alert("회원가입이 완료되었습니다.");
        navigate("/login", { replace: true });
      },
      onError: (e) => {
        if (axios.isAxiosError(e)) {
          alert(axiosErrorMessageFormat(e));
        }

        console.error(e);
      },
    });
  };

  return (
    <div className="z-10 flex flex-col gap-8 rounded-2xl bg-white/70 p-6 shadow-xl dark:bg-[rgba(15,23,42,0.8)]">
      <div className="text-xl font-bold">회원가입</div>

      <div className="flex flex-col gap-2">
        <Input
          className="w-100 py-6"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
        />
        <Input
          className="w-100 py-6"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디"
        />
        <Input
          className="w-100 py-6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <Input
          className="w-100 py-6"
          type="tel"
          placeholder="연락처"
          value={tel}
          onChange={handleTelChange}
        />
        <Input
          className="w-100 py-6"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail"
        />

        <div className="flex w-100 flex-col gap-1.5">
          <DatePicker
            date={birthday}
            setDate={setBirthday}
            placeholder="생년월일"
          />
        </div>

        <div className="w-100 py-2">
          <Label htmlFor="gender">성별</Label>
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
      </div>

      <div className="flex flex-col gap-2">
        <Button
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600"
          onClick={handleJoinClick}
          disabled={isPending}
        >
          회원가입
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

export default Join;
