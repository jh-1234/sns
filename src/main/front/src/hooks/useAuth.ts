import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getSession,
  getUserInfo,
  join,
  login,
  logout,
  userInfoUpdate,
} from "@/api/auth";
import { useNavigate } from "react-router";
import { useSetSession } from "@/store/Session";
import { QUERY_KEYS } from "@/lib/constants";

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

export const useSession = () => {
  const setSession = useSetSession();

  return useQuery({
    queryKey: [QUERY_KEYS.user.session],
    queryFn: async () => {
      const session = await getSession();
      setSession(session);

      return session;
    },
  });
};

export const useUserInfo = (uuid: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.user.info(uuid),
    queryFn: () => getUserInfo(uuid),
  });
};

export const useUserInfoUpdate = () => {
  return useMutation({
    mutationFn: userInfoUpdate,
  });
};
