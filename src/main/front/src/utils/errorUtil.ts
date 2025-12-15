import type { AxiosError } from "axios";

export const axiosErrorMessageFormat = (e: AxiosError) => {
  if (e.response?.data) {
    return Object.values(e.response?.data).join("\n");
  }

  return "error";
};
