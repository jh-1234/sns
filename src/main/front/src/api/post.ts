import type { Page } from "@/types/page";
import type { Post } from "@/types/post";
import axios from "axios";

const PAGE_SIZE = 10;

export const postSave = async ({
  data,
  images,
}: {
  data: Post;
  images?: File[];
}) => {
  const formData = new FormData();

  const postData = new Blob([JSON.stringify(data)], {
    type: "application/json",
  });

  formData.append("data", postData);

  if (images && images.length > 0) {
    images.forEach((file) => {
      formData.append("images", file);
    });
  }

  let res;

  if (data.postId) {
    res = await axios.patch("/api/post", formData);
  } else {
    res = await axios.post("/api/post", formData);
  }

  return res;
};

// 일반 페이징
export const getPosts = async (
  page = 0,
  size = PAGE_SIZE,
): Promise<Page<Post>> => {
  const { data } = await axios.get("/api/post", {
    params: {
      page: page,
      size: size,
    },
  });

  return data;
};

// 무한 스크롤
export const getPostsInfinity = async ({
  pageParam = 0,
}): Promise<Page<Post>> => {
  const { data } = await axios.get("/api/post", {
    params: {
      page: pageParam,
      size: PAGE_SIZE,
    },
  });

  return data;
};

export const postDelete = async (postId: number) => {
  const res = await axios.delete(`/api/post/${postId}`);

  return res;
};
