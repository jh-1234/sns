import { useOpenProfileEditorModal } from "@/store/ProfileEditorModal";
import { Button } from "../ui/button";

const EditProfileButton = () => {
  const openProfileEditorModal = useOpenProfileEditorModal();

  return (
    <Button
      onClick={openProfileEditorModal}
      variant={"secondary"}
      className="cursor-pointer"
    >
      프로필 수정
    </Button>
  );
};

export default EditProfileButton;
