import { login } from "@/api/auth";
import { useSetSession } from "@/store/session";
import { axiosErrorMessageFormat } from "@/utils/errorUtil";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const navigate = useNavigate();
  const setSession = useSetSession();

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      setSession(res.data);
      navigate("/", { replace: true });
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        alert(axiosErrorMessageFormat(e));
      }
    },
  });
};
