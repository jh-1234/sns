import { create } from "zustand";
import { combine } from "zustand/middleware";

const init: { isOpen: boolean } = {
  isOpen: false,
};

const usePostEditorModalStore = create(
  combine(init, (set) => ({
    actions: {
      open: () => {
        set({ isOpen: true });
      },
      close: () => {
        set({ isOpen: false });
      },
    },
  })),
);

export const useOpenPostEditorModal = () => {
  const open = usePostEditorModalStore((store) => store.actions.open);

  return open;
};

export const usePostEditorModal = () => {
  const {
    isOpen,
    actions: { open, close },
  } = usePostEditorModalStore();

  return { isOpen, open, close };
};
