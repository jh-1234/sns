import { getPosts, getPostsInfinity, postDelete, postSave } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const usePostSave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSave,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: QUERY_KEYS.post.list });
    },
  });
};

export const useGetPosts = (page: number, size: number) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.post.list, { page, size }],
    queryFn: () => getPosts(page, size),
  });
};

export const useGetPostsInfinity = () => {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }) => {
      const posts = await getPostsInfinity({ pageParam });

      posts.content.forEach((post) => {
        queryClient.setQueryData(QUERY_KEYS.post.byId(post.postId!), post);
      });

      return posts;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.number + 1;
    },
  });
};

export const usePostDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postDelete,
    onSuccess: (_, postId) => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.post.byId(postId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.list });
    },
  });
};
