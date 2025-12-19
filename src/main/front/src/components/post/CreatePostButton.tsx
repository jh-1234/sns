import { useOpenPostEditorModal } from "@/store/PostEditorModal";
import { PlusCircleIcon } from "lucide-react";

const CreatePostButton = () => {
  const openPostEditorModal = useOpenPostEditorModal();

  const handleButtonClick = () => {
    openPostEditorModal();
  };

  return (
    <div
      onClick={handleButtonClick}
      className="bg-muted text-muted-foreground cursor-pointer rounded-xl px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div>이야기를 공유해보세요.</div>
        <PlusCircleIcon className="h-5 w-5" />
      </div>
    </div>
  );
};

export default CreatePostButton;
