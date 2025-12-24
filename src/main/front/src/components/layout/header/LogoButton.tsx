import logo from "@/assets/logo.png";
import { Link } from "react-router";

const LogoButton = () => {
  return (
    <Link to={"/"} className="flex items-center">
      <img className="h-12 w-24" src={logo} />
    </Link>
  );
};

export default LogoButton;
