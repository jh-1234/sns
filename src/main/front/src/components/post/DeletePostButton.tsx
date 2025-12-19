import { usePostDelete } from "@/hooks/usePost";
import { Button } from "../ui/button";
import { useOpenAlertModal } from "@/store/AlertModal";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const DeletePostButton = ({ postId }: { postId: number }) => {
  const { mutate: postDelete, isPending } = usePostDelete();

  const openAlertModal = useOpenAlertModal();

  const handleButtonClick = () => {
    openAlertModal({
      title: "포스트 삭제",
      description: "포스트를 삭제하시겠습니까?",
      onPositive: () => {
        postDelete(postId, {
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
    <Button
      onClick={handleButtonClick}
      className="cursor-pointer"
      variant={"ghost"}
      disabled={isPending}
    >
      삭제
    </Button>
  );
};
export default DeletePostButton;
