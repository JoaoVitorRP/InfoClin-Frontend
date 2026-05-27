import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";

import Logo from "../components/Logo/Logo";
import CpfInput from "../components/Form/Input/CpfInput";
import SenhaInput from "../components/Form/Input/SenhaInput";
import Button from "../components/Form/Button/Button";
import TailSpinLoading from "../components/Loading/TailSpinLoading";

import { registerUser } from "../services/authService";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    cpf: "",
    senha: "",
    senhaPublica: "",
  });
  const [senhaInvalida, setSenhaInvalida] = useState(false);
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [confirmacaoSenhaInvalida, setConfirmacaoSenhaInvalida] = useState(false);
  const [senhaPublicaInvalida, setSenhaPublicaInvalida] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const allFieldsFilledAndValid =
    !formData.cpf.trim().includes("_") &&
    formData.cpf.trim().length === 14 &&
    formData.senha.trim() !== "" &&
    formData.senha.length >= 6 &&
    confirmacaoSenha.trim() !== "" &&
    confirmacaoSenha === formData.senha &&
    formData.senhaPublica !== "" &&
    formData.senhaPublica !== formData.senha &&
    formData.senhaPublica.length >= 6;

  const handleSenhaChange = (e) => {
    const senhaValue = e.target.value;
    setFormData({ ...formData, senha: senhaValue.trim() });
  };

  useEffect(() => {
    if (formData.senha === "") {
      setSenhaInvalida(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      if (formData.senha.length < 6) {
        setSenhaInvalida(true);
      } else {
        setSenhaInvalida(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.senha]);

  const handleConfirmacaoSenhaChange = (e) => {
    const confirmacaoSenhaValue = e.target.value;
    setConfirmacaoSenha(confirmacaoSenhaValue.trim());
  };

  useEffect(() => {
    if (confirmacaoSenha === "") {
      setConfirmacaoSenhaInvalida(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      if (confirmacaoSenha !== formData.senha && formData.senha.length >= 6) {
        setConfirmacaoSenhaInvalida(true);
      } else {
        setConfirmacaoSenhaInvalida(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.senha, confirmacaoSenha]);

  const handleSenhaPublicaChange = (e) => {
    const senhaPublicaValue = e.target.value;
    setFormData({ ...formData, senhaPublica: senhaPublicaValue.trim() });
  };

  useEffect(() => {
    if (formData.senhaPublica === "") {
      setSenhaPublicaInvalida(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      if (formData.senhaPublica === formData.senha || formData.senhaPublica.length < 6) {
        setSenhaPublicaInvalida(true);
      } else {
        setSenhaPublicaInvalida(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.senhaPublica]);

  const submitForm = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await registerUser(formData);

      toast.success("Cadastro realizado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      navigate("/login");
    } catch (err) {
      toast.error(`Erro ao cadastrar usuário: (${err.status}) ${err.response.data}`, {
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
        <form className="flex-column" style={{ width: "300px" }} onSubmit={submitForm}>
          <Logo isHeader={false} />
          <CpfInput onChange={(e) => setFormData({ ...formData, cpf: e.target.value })} value={formData.cpf} />
          <SenhaInput
            id="senha"
            label="Senha"
            placeholder="Mínimo 6 caracteres"
            onChange={handleSenhaChange}
            value={formData.senha}
            hasError={senhaInvalida}
            errorMsg="A senha deve possuir mais de 6 caracteres"
          />
          <SenhaInput
            id="confirmacaoSenha"
            label="Confirme sua senha"
            placeholder="Confirme sua senha"
            onChange={handleConfirmacaoSenhaChange}
            value={confirmacaoSenha}
            hasError={confirmacaoSenhaInvalida}
            errorMsg="As senhas não coincidem"
          />
          <SenhaInput
            id="senhaPublica"
            label="Crie uma senha pública *"
            placeholder="Mínimo 6 caracteres"
            onChange={handleSenhaPublicaChange}
            value={formData.senhaPublica}
            hasError={senhaPublicaInvalida}
            errorMsg="A senha pública não pode ser igual à senha da conta"
          />
          <p style={{ marginBottom: "25px", lineHeight: "18px" }}>
            *A senha pública será utilizada pelas pessoas para acesar suas informações clínicas através do código QR gerado. Ela não poderá ser
            igual à senha da conta.
          </p>
          <Button text="Finalizar cadastro" disabled={!allFieldsFilledAndValid || isLoading} />
          <Link to={"/login"} className="styled-link">
            Já possui uma conta? Faça login!
          </Link>
        </form>
      </div>
    </>
  );
}
