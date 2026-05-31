import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

import Logo from "../Logo/Logo";

import { useAuth } from "../../contexts/AuthContext";

import "./Header.css";

export default function Header() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="full-width">
      <Link to="/inicio" className="header-link">
        <Logo isHeader={true} />
      </Link>

      <button className="btn-link link-blue-txt" onClick={handleLogout}>
        Encerrar sessão <MdLogout />
      </button>
    </header>
  );
}
