import { getPosts, getPostsInfinity, postSave } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const usePostSave = () => {
  return useMutation({
    mutationFn: postSave,
  });
};

export const useGetPosts = (page: number, size: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: () => getPosts(page, size),
  });
};

export const useGetPostsInfinity = () => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: ({ pageParam }) => getPostsInfinity({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.number + 1;
    },
  });
};
