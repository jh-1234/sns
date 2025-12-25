import type { Page } from "@/types/page";
import type { Comment, Post } from "@/types/post";
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
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  let res;

  if (data.postId) {
    res = await axios.patch("/api/posts", formData);
  } else {
    res = await axios.post("/api/posts", formData);
  }

  return res;
};

// detail
export const getPost = async (postId: number): Promise<Post> => {
  const { data } = await axios.get(`/api/posts/${postId}`);

  return data;
};

// 일반 페이징
export const getPosts = async (
  page = 0,
  size = PAGE_SIZE,
): Promise<Page<Post>> => {
  const { data } = await axios.get("/api/posts", {
    params: {
      page: page,
      size: size,
    },
  });

  return data;
};

// 무한 스크롤
export const getPostsInfinity = async ({
  uuid,
  pageParam = 0,
}: {
  uuid?: string;
  pageParam: number;
}): Promise<Page<Post>> => {
  const { data } = await axios.get("/api/posts", {
    params: {
      uuid,
      page: pageParam,
      size: PAGE_SIZE,
    },
  });

  return data;
};

export const postDelete = async (postId: number) => {
  const res = await axios.delete(`/api/posts/${postId}`);

  return res;
};

export const togglePostLike = async ({
  postId,
  isLiked,
}: {
  postId: number;
  isLiked: boolean;
}) => {
  const res = await axios.post("/api/post-like-count-update", {
    postId,
    isLiked,
  });

  return res;
};

export const getComments = async (postId: number): Promise<Comment[]> => {
  const { data } = await axios.get(`/api/posts/${postId}/comments`);

  return data;
};

export const commentSave = async (comment: Comment) => {
  const res = await axios.post("/api/posts/comments", comment);

  return res;
};

export const commentUpdate = async (comment: Comment) => {
  const res = await axios.patch("/api/posts/comments", comment);

  return res;
};

export const commentDelete = async (commentId: number) => {
  const res = await axios.delete(`/api/posts/comments/${commentId}`);

  return res;
};
