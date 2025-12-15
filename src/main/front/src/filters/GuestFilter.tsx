import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

const GuestFilter = () => {
  const session = useSession();

  if (session) return <Navigate to={"/"} replace={true} />;

  return <Outlet />;
};

export default GuestFilter;
