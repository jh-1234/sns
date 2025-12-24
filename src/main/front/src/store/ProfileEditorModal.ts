import { create } from "zustand";
import { combine } from "zustand/middleware";

const init: { isOpen: boolean } = {
  isOpen: false,
};

const useProfileEditorModalStore = create(
  combine(init, (set) => ({
    actions: {
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    },
  })),
);

export const useOpenProfileEditorModal = () => {
  const open = useProfileEditorModalStore((store) => store.actions.open);

  return open;
};

export const useProfileEditorModal = () => {
  const store = useProfileEditorModalStore();

  return store;
};
