import type { Post } from "@/types/post";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const init: { isOpen: boolean; post: Post | null } = {
  isOpen: false,
  post: null,
};

const usePostEditorModalStore = create(
  combine(init, (set) => ({
    actions: {
      open: (post?: Post) => {
        set({ isOpen: true, post: post || null });
      },
      close: () => {
        set({ isOpen: false, post: null });
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
    post,
    actions: { open, close },
  } = usePostEditorModalStore();

  return { isOpen, post, open, close };
};
