import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

const AuthFilter = () => {
  const session = useSession();

  if (!session) return <Navigate to={"/login"} replace={true} />;

  return <Outlet />;
};

export default AuthFilter;
