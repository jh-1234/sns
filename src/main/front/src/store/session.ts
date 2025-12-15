import type { Session } from "@/types/auth";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

const init: {
  session: Session | null;
} = {
  session: null,
};

const useSessionStore = create(
  persist(
    combine(init, (set) => ({
      actions: {
        setSession: (session: Session | null) => {
          set({ session });
        },
      },
    })),
    {
      name: "session-info",
      partialize: (store) => ({
        session: store.session,
      }),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useSession = () => {
  const session = useSessionStore((store) => store.session);

  return session;
};

export const useSetSession = () => {
  const setSession = useSessionStore((store) => store.actions.setSession);

  return setSession;
};
