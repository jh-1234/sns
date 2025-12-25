import { Link } from "react-router";
import defaultProfile from "@/assets/default_profile.png";
import type { Comment } from "@/types/post";
import { useCommentDelete } from "@/hooks/usePost";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useOpenAlertModal } from "@/store/AlertModal";
import { useSession } from "@/store/Session";
import { useState } from "react";
import CommentEditor from "./CommentEditor";

const CommentItem = ({ comment }: { comment: Comment }) => {
  const session = useSession();
  const openAlertModal = useOpenAlertModal();
  const { mutate: del } = useCommentDelete();

  const isMine = comment.userSeq === session?.seq;

  const [isEditing, setIsEditing] = useState(false);

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    openAlertModal({
      title: "댓글 삭제",
      description: "댓글을 삭제하시겠습니까?",
      onPositive: () => {
        del(comment, {
          onSuccess: () => {
            toast.success("삭제되었습니다.", {
              icon: <Trash2 size={18} />,
              position: "top-center",
              style: {
                backgroundColor: "white",
                color: "#ef4444",
                border: "none",
              },
            });
          },
          onError: (e) => {
            toast.error("삭제 중 오류가 발생했습니다.", {
              position: "top-center",
            });

            console.error(e);
          },
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-8 border-b pb-5">
      <div className="flex items-start gap-4">
        <Link to={`/profile/${comment.uuid}`}>
          <div>
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={comment.userProfileUrl || defaultProfile}
              alt="profile"
            />
          </div>
        </Link>
        <div className="flex w-full flex-col gap-2">
          <div className="font-bold">{comment.username}</div>
          {isEditing ? (
            <CommentEditor
              comment={comment}
              isEditing={true}
              onCancel={toggleIsEditing}
            />
          ) : (
            <div>{comment.content}</div>
          )}
          <div className="text-muted-foreground flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="cursor-pointer hover:underline">댓글</div>
              <div className="bg-border h-[13px] w-0.5"></div>
              <div>10분전</div>
            </div>
            {isMine && (
              <div className="flex items-center gap-2">
                <button
                  className="cursor-pointer hover:underline"
                  onClick={toggleIsEditing}
                >
                  수정
                </button>
                <div className="bg-border h-[13px] w-0.5"></div>
                <button
                  className="cursor-pointer hover:underline"
                  onClick={handleDelete}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
