import { useSession } from "@/store/Session";
import { Navigate, Outlet } from "react-router";

const AuthFilter = () => {
  const session = useSession();

  if (!session) return <Navigate to={"/login"} replace={true} />;

  return <Outlet />;
};

export default AuthFilter;
