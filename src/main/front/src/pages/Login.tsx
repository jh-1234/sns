import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import {
  IconWrap,
  Input,
  InputGroup,
  Label,
  LoginForm,
  StyleButton,
  Underline,
  UserNavigation,
  UserNavigationWrap,
} from "../styles/Login.styles";
import { useLogin } from "@/hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const data = {
      username,
      password,
    };

    login(data);
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <InputGroup>
        <IconWrap>
          <PersonIcon />
        </IconWrap>
        <Input
          type="text"
          id="username"
          placeholder=" "
          required
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <Label htmlFor="username">아이디를 입력하세요.</Label>
        <Underline />
      </InputGroup>

      <InputGroup>
        <IconWrap>
          <LockIcon />
        </IconWrap>
        <Input
          type="password"
          id="password"
          placeholder=" "
          required
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <Label htmlFor="password">비밀번호를 입력하세요.</Label>
        <Underline />
      </InputGroup>

      <StyleButton
        type="submit"
        variant="contained"
        size="large"
        startIcon={<LoginIcon />}
        disabled={isPending}
      >
        로그인
      </StyleButton>

      <UserNavigationWrap>
        <UserNavigation to={"/join"}>회원가입</UserNavigation>
        <UserNavigation to={"/forget-password"}>비밀번호 초기화</UserNavigation>
      </UserNavigationWrap>
    </LoginForm>
  );
};

export default Login;
