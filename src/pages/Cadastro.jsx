import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";

import CpfInput from "../components/Form/Input/CpfInput";
import SenhaInput from "../components/Form/Input/SenhaInput";
import Button from "../components/Form/Button/Button";

import Auth from "../layouts/Auth";

import { registerUser } from "../services/authService";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    cpf: "",
    senha: "",
    confirmacaoSenha: "",
    senhaPublica: "",
  });
  const [senhaInvalida, setSenhaInvalida] = useState(false);
  const [confirmacaoSenhaInvalida, setConfirmacaoSenhaInvalida] = useState(false);
  const [senhaPublicaInvalida, setSenhaPublicaInvalida] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const allFieldsFilledAndValid =
    !formData.cpf.trim().includes("_") &&
    formData.cpf.trim().length === 14 &&
    formData.senha.trim() !== "" &&
    formData.senha.length >= 6 &&
    formData.confirmacaoSenha.trim() !== "" &&
    formData.confirmacaoSenha === formData.senha &&
    formData.senhaPublica !== "" &&
    formData.senhaPublica !== formData.senha &&
    formData.senhaPublica.length >= 6;

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

  useEffect(() => {
    if (formData.confirmacaoSenha === "") {
      setConfirmacaoSenhaInvalida(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      if (formData.confirmacaoSenha !== formData.senha && formData.senha.length >= 6) {
        setConfirmacaoSenhaInvalida(true);
      } else {
        setConfirmacaoSenhaInvalida(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.senha, formData.confirmacaoSenha]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { confirmacaoSenha, ...data } = formData;

      await registerUser(data);

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
    <Auth isLoading={isLoading} handleSubmit={handleSubmit}>
      <CpfInput onChange={handleChange} value={formData.cpf} />
      <SenhaInput
        id="senha"
        label="Senha"
        placeholder="Mínimo 6 caracteres"
        onChange={handleChange}
        value={formData.senha}
        hasError={senhaInvalida}
        errorMsg="A senha deve possuir mais de 6 caracteres"
      />
      <SenhaInput
        id="confirmacaoSenha"
        label="Confirme sua senha"
        placeholder="Confirme sua senha"
        onChange={handleChange}
        value={formData.confirmacaoSenha}
        hasError={confirmacaoSenhaInvalida}
        errorMsg="As senhas não coincidem"
      />
      <SenhaInput
        id="senhaPublica"
        label="Crie uma senha pública *"
        placeholder="Mínimo 6 caracteres"
        onChange={handleChange}
        value={formData.senhaPublica}
        hasError={senhaPublicaInvalida}
        errorMsg="A senha pública não pode ser igual à senha da conta"
      />
      <p style={{ marginBottom: "25px", lineHeight: "18px" }}>
        *A senha pública será utilizada pelas pessoas para acesar suas informações clínicas através do código QR gerado. Ela não poderá ser igual
        à senha da conta.
      </p>
      <Button text="Finalizar cadastro" disabled={!allFieldsFilledAndValid || isLoading} />
      <Link to={"/login"} className="styled-link link-blue-txt">
        Já possui uma conta? Faça login!
      </Link>
    </Auth>
  );
}
