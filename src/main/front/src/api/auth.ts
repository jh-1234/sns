import type { Join, Login, User, UserInfo } from "@/types/auth";
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

export const getSession = async (): Promise<User> => {
  const { data } = await axios.get("/api/session");

  return data;
};

export const getUserInfo = async (uuid: string): Promise<User> => {
  const { data } = await axios.get(`/api/user-info/${uuid}`);

  return data;
};

export const userInfoUpdate = async ({
  data,
  image,
}: {
  data: UserInfo;
  image?: File;
}) => {
  const formData = new FormData();

  const postData = new Blob([JSON.stringify(data)], {
    type: "application/json",
  });

  formData.append("data", postData);

  if (image) {
    formData.append("image", image);
  }

  let res = await axios.patch("/api/user-info", formData);

  return res;
};
