import AlertModal from "@/components/modal/AlertModal";
import PostEditorModal from "@/components/modal/PostEditorModal";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {createPortal(
        <>
          <PostEditorModal />
          <AlertModal />
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
};

export default ModalProvider;
