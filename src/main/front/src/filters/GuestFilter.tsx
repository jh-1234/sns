import { useSession } from "@/store/Session";
import { Navigate, Outlet } from "react-router";

const GuestFilter = () => {
  const session = useSession();

  if (session) return <Navigate to={"/"} replace={true} />;

  return <Outlet />;
};

export default GuestFilter;
