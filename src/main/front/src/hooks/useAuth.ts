import { useMutation } from "@tanstack/react-query";
import { join, login, logout } from "@/api/auth";

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
  return useMutation({
    mutationFn: logout,
  });
};
