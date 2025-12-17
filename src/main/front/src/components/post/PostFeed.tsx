import { useGetPostsInfinity } from "@/hooks/usePost";
import Fallback from "../common/Fallback";
import Loader from "../common/Loader";
import PostItem from "./PostItem";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PostFeed = () => {
  const {
    data,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetPostsInfinity();
  const { ref, inView } = useInView({
    threshold: 1.0,
    rootMargin: "0px 0px 50px 0px",
    delay: 300,
  });
  const posts = data?.pages.flatMap((page) => page.content ?? []);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {Array.isArray(posts) &&
        posts.map((post) => <PostItem key={post.postId} {...post} />)}
      {isFetchingNextPage && <Loader />}
      {!isFetching && hasNextPage && <div ref={ref} className="h-1"></div>}
    </div>
  );
};

export default PostFeed;
