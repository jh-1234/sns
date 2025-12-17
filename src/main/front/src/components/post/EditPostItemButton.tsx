import { useOpenPostEditorModal } from "@/store/PostEditorModal";
import { Button } from "../ui/button";

const EditPostItemButton = () => {
  const openPostEditorModel = useOpenPostEditorModal();

  const handleButtonClick = () => {
    openPostEditorModel();
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

export default EditPostItemButton;
