import CommentEditor from "@/components/comment/CommentEditor";
import CommentList from "@/components/comment/CommentList";
import Fallback from "@/components/common/Fallback";
import Loader from "@/components/common/Loader";
import PostItem from "@/components/post/PostItem";
import { useGetPost } from "@/hooks/usePost";
import { Navigate, useParams } from "react-router";

const PostDetail = () => {
  const params = useParams();
  const postId = params.postId;

  if (!postId) return <Navigate to={"/"} />;

  const { data: post, isPending, isError } = useGetPost(Number(postId));

  if (isPending) return <Loader />;
  if (isError) return <Fallback />;

  return (
    <div className="flex flex-col gap-5">
      <PostItem post={post} isDetail={true} />
      <div className="text-xl font-bold">댓글 ({post.commentCount})</div>
      <CommentEditor postId={Number(postId)} />
      <CommentList postId={Number(postId)} />
    </div>
  );
};

export default PostDetail;
