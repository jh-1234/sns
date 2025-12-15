import { sessionCheck } from "@/api/auth";
import { useSetSession } from "@/store/session";
import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router";

const SessionFilter = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const setSession = useSetSession();

  useEffect(() => {
    const fn = async () => {
      const data = await sessionCheck();

      setSession(data);
    };

    fn();
  }, [location]);

  return <>{children}</>;
};

export default SessionFilter;
