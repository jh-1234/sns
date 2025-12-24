import {
  getPosts,
  getPostsInfinity,
  postDelete,
  postSave,
  togglePostLike,
} from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostSave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.list });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.users });
    },
  });
};

export const useGetPosts = (page: number, size: number) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.post.list, { page, size }],
    queryFn: () => getPosts(page, size),
  });
};

export const useGetPostsInfinity = (uuid?: string) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: uuid ? QUERY_KEYS.post.user(uuid) : QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }) => {
      const posts = await getPostsInfinity({ uuid, pageParam });

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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.users });
    },
  });
};

export const useTogglePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePostLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.list });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.users });
    },
    onError: (e) => {
      toast.error("오류가 발생했습니다.", { position: "top-center" });

      console.error(e);
    },
  });
};
