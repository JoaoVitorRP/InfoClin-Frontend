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

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route element={<PrivateRoute />}>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/cadastrar-ficha" element={<CadastrarFicha />} />
            <Route path="/editar-ficha" element={<EditarFicha />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
