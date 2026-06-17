import { Link, useLocation } from "react-router-dom";
import QRCode from "react-qr-code";

import Logo from "../components/Logo/Logo";

import { useAuth } from "../contexts/AuthContext";

export default function QrCode() {
  const location = useLocation();

  const clinicalData = location.state?.clinicalData ?? null;

  const { userData } = useAuth();

  return (
    <div className="full-screen screen-center white-bg flex-column">
      <Link to="/inicio" className="styled-link link-blue-txt" style={{ position: "absolute", top: "0", left: "30px" }}>
        ← Voltar
      </Link>
      <Link to="/inicio" style={{ textDecoration: "none" }}>
        <Logo isHeader={false} />
      </Link>
      <QRCode value={`${import.meta.env.VITE_FRONT_URL}/ficha-publica/${clinicalData.codigo}`} />
      <p style={{ marginTop: "15px" }}>
        <b>{`${import.meta.env.VITE_FRONT_URL}/ficha-publica/${clinicalData.codigo}`}</b>
      </p>
      <p style={{ marginTop: "30px" }}>
        <b>Senha pública: {userData.senhaPublica}</b>
      </p>
    </div>
  );
}
