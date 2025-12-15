import { join } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useJoin = () => {
  return useMutation({
    mutationFn: join,
  });
};
