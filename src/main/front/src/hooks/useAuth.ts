import { useMutation } from "@tanstack/react-query";
import { join, login, logout } from "@/api/auth";
import { useNavigate } from "react-router";
import { useSetSession } from "@/store/Session";

export const useJoin = () => {
  return useMutation({
    mutationFn: join,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const setSession = useSetSession();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setSession(null);
      navigate("/login", { replace: true });
    },
    onError: (e) => {
      console.error(e);
    },
  });
};
