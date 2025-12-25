import { useGetComments } from "@/hooks/usePost";
import CommentItem from "./CommentItem";

const CommentList = ({ postId }: { postId: number }) => {
  const { data: comments } = useGetComments(postId);

  return (
    <div className="flex flex-col gap-5">
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment.commentId} comment={comment} />
        ))
      ) : (
        <div>등록된 댓글이 없습니다.</div>
      )}
    </div>
  );
};

export default CommentList;
