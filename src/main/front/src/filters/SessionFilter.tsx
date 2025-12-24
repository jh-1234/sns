import Loader from "@/components/common/Loader";
import { useSession } from "@/hooks/useAuth";
import { type ReactNode } from "react";

const SessionFilter = ({ children }: { children: ReactNode }) => {
  const { isLoading, isPending } = useSession();

  if (isLoading || isPending) return <Loader />;

  return <>{children}</>;
};

export default SessionFilter;
