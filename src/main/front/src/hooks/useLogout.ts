import { logout } from "@/api/auth";
import { useSetSession } from "@/store/session";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

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
