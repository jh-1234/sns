import { useOpenPostEditorModal } from "@/store/PostEditorModal";
import { Button } from "../ui/button";
import type { Post } from "@/types/post";

const EditPostButton = ({ post }: { post: Post }) => {
  const openPostEditorModal = useOpenPostEditorModal();

  const handleButtonClick = () => {
    openPostEditorModal(post);
  };

  return (
    <Button
      onClick={handleButtonClick}
      className="cursor-pointer"
      variant={"ghost"}
    >
      수정
    </Button>
  );
};

export default EditPostButton;
