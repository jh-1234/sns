import { useTogglePostLike } from "@/hooks/usePost";
import { HeartIcon } from "lucide-react";

const LikePostButton = ({
  postId,
  isLiked,
  likeCount,
}: {
  postId: number;
  isLiked: boolean;
  likeCount: number;
}) => {
  const { mutate: togglePostLike, isPending } = useTogglePostLike();

  const handleLikeClick = () => {
    togglePostLike({
      postId,
      isLiked,
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleLikeClick}
      className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm"
    >
      <HeartIcon
        className={`h-4 w-4 ${isLiked && "fill-foreground border-foreground"} `}
      />
      <span>{likeCount}</span>
    </button>
  );
};

export default LikePostButton;
