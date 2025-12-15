import type { Join, Login } from "@/types/auth";
import axios from "axios";

export const join = async (data: Join) => {
  const res = await axios.post("/api/join", data);

  return res;
};

export const login = async (data: Login) => {
  const res = await axios.post("/api/loginProc", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    validateStatus: (status) => status === 200,
  });

  return res;
};

export const logout = async () => {
  const res = await axios.post("/api/logout");

  return res;
};

export const sessionCheck = async () => {
  const { data } = await axios.get("/api/session-check");

  return data;
};
