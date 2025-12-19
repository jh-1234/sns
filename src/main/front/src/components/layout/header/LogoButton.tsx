import logo from "@/assets/logo.png";
import { Link } from "react-router";

const LogoButton = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2">
      <img className="h-10" src={logo} />
    </Link>
  );
};

export default LogoButton;
