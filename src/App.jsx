import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./assets/styles/reset.css";
import "./assets/styles/app.css";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import PrivateRoute from "./pages/PrivateRoute";
import Inicio from "./pages/Inicio";
import CadastrarFicha from "./pages/CadastrarFicha";
import EditarFicha from "./pages/EditarFicha";
import QrCode from "./pages/QrCode";
import FichaPublica from "./pages/FichaPublica";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route element={<PrivateRoute />}>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/cadastrar-ficha" element={<CadastrarFicha />} />
            <Route path="/editar-ficha" element={<EditarFicha />} />
            <Route path="/qrcode" element={<QrCode />} />
          </Route>
          <Route path="/ficha-publica/:codigo" element={<FichaPublica />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
