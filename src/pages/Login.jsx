import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";

import Logo from "../components/Logo/Logo";
import CpfInput from "../components/Form/Input/CpfInput";
import SenhaInput from "../components/Form/Input/SenhaInput";
import Button from "../components/Form/Button/Button";
import TailSpinLoading from "../components/Loading/TailSpinLoading";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    cpf: "",
    senha: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const allFieldsFilledAndValid = !formData.cpf.trim().includes("_") && formData.cpf.trim().length === 14 && formData.senha.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await login(formData);

      navigate("/inicio");
    } catch (err) {
      console.log(err);

      toast.error(err.status == 401 ? "Usuário ou senha inválidos." : `Erro ao realizar login: (${err.status}) ${err.response.data}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <TailSpinLoading />}
      <div className="full-screen screen-center white-bg">
        <form className="flex-column" style={{ width: "300px" }} onSubmit={handleSubmit}>
          <Logo isHeader={false} />
          <CpfInput onChange={(e) => setFormData({ ...formData, cpf: e.target.value })} value={formData.cpf} />
          <SenhaInput
            id="senha"
            label="Senha"
            placeholder="Insira sua senha"
            onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
            value={formData.senha}
          />
          <Button text="Login" disabled={!allFieldsFilledAndValid} />
          <Link to={"/cadastro"} className="styled-link">
            Ainda não possui uma conta? Cadastre-se!
          </Link>
        </form>
      </div>
    </>
  );
}
