import { create } from "zustand";
import { combine } from "zustand/middleware";

type State = {
  isOpen: boolean;
  title?: string;
  description?: string;
  onPositive?: () => void;
  onNegative?: () => void;
};

const init: State = {
  isOpen: false,
};

const useAlertModalStore = create(
  combine(init, (set) => ({
    actions: {
      open: (params: Omit<State, "isOpen">) => {
        set({ ...params, isOpen: true });
      },
      close: () => {
        set({ isOpen: false });
      },
    },
  })),
);

export const useOpenAlertModal = () => {
  const open = useAlertModalStore((store) => store.actions.open);

  return open;
};

export const useAlertModal = () => {
  const store = useAlertModalStore();

  return store;
};
