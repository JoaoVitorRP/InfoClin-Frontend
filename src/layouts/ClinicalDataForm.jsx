import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { postClinicalData } from "../services/clinicalDataService";

import Main from "./Main";
import TextInput from "../components/Form/Input/TextInput";
import RadioInput from "../components/Form/Input/RadioInput";
import TelephoneInput from "../components/Form/Input/TelephoneInput";
import SelectInput from "../components/Form/Input/SelectInput";
import TextArea from "../components/Form/TextArea/TextArea";
import Button from "../components/Form/Button/Button";

export default function ClinicalDataForm({ title, buttonText, clinicalData }) {
  const {
    nome = "",
    sobrenome = "",
    sexo = "",
    nomeContato = "",
    telefoneContato = "",
    tipoSanguineo = "",
    alergias = "",
    medicamentos = "",
    doencas = "",
    cirurgias = "",
  } = clinicalData ?? {};

  const [formData, setFormData] = useState({
    nome,
    sobrenome,
    sexo,
    nomeContato,
    telefoneContato,
    tipoSanguineo,
    alergias,
    medicamentos,
    doencas,
    cirurgias,
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const sexoOptions = [
    {
      id: "sexoMasc",
      value: "M",
      label: "Masculino",
    },
    {
      id: "sexoFem",
      value: "F",
      label: "Feminino",
    },
    {
      id: "sexoNaoInfo",
      value: "NI",
      label: "Prefiro não informar",
    },
    {
      id: "sexoOutro",
      value: "X",
      label: "Outro",
    },
  ];

  const tipoSanguineoOptions = [
    {
      id: "selecione",
      value: "",
      label: "Selecione...",
    },
    {
      id: "aRh",
      value: "A+",
      label: "A positivo (A+)",
    },
    {
      id: "a",
      value: "A-",
      label: "A negativo (A-)",
    },
    {
      id: "bRh",
      value: "B+",
      label: "B positivo (B+)",
    },
    {
      id: "b",
      value: "B-",
      label: "B negativo (B-)",
    },
    {
      id: "abRh",
      value: "AB+",
      label: "AB positivo (AB+)",
    },
    {
      id: "ab",
      value: "AB-",
      label: "AB negativo (AB-)",
    },
    {
      id: "oRh",
      value: "O+",
      label: "O positivo (O+)",
    },
    {
      id: "o",
      value: "O-",
      label: "O negativo (O-)",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await postClinicalData(formData);
      const data = response.data;

      toast.success("Dados clínicos cadastrados com sucesso!", {
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

      navigate("/inicio", { state: { data } });
    } catch (err) {
      toast.error(`Erro ao cadastrar ficha: (${err.status}) ${err.response?.data}`, {
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

  const allFieldsFilledAndValid =
    formData.nome.length > 0 &&
    formData.sobrenome.length > 0 &&
    formData.sexo.length > 0 &&
    sexoOptions.some((option) => option.value !== "" && option.value === formData.sexo) &&
    formData.nomeContato.length > 0 &&
    formData.telefoneContato.length > 0 &&
    !formData.telefoneContato.includes("_") &&
    formData.tipoSanguineo.length > 0 &&
    tipoSanguineoOptions.some((option) => option.value !== "" && option.value === formData.tipoSanguineo) &&
    formData.alergias.length <= 1000 &&
    formData.medicamentos.length <= 1000 &&
    formData.doencas.length <= 1000 &&
    formData.cirurgias.length <= 1000 &&
    !isLoading;

  return (
    <Main title={title}>
      <form className="flex-column" style={{ width: "300px" }} onSubmit={handleSubmit}>
        <h2 className="blue-txt">Seus dados:</h2>
        <TextInput id="nome" label="Nome" placeholder="Insira seu nome" onChange={handleChange} value={formData.nome} required={true} />
        <TextInput
          id="sobrenome"
          label="Sobrenome"
          placeholder="Insira seu sobrenome"
          onChange={handleChange}
          value={formData.sobrenome}
          required={true}
        />
        <RadioInput id="sexo" label="Sexo" onChange={handleChange} value={formData.sexo} radioOptions={sexoOptions} required={true} />

        <hr className="content-hr" />

        <h2 className="blue-txt">Contato de emergência:</h2>
        <TextInput
          id="nomeContato"
          label="Nome do contato"
          placeholder="Insira o nome do contato"
          onChange={handleChange}
          value={formData.nomeContato}
          required={true}
        />
        <TelephoneInput
          id="telefoneContato"
          label="Telefone do contato"
          onChange={handleChange}
          value={formData.telefoneContato}
          required={true}
        />

        <hr className="content-hr" />

        <h2 className="blue-txt">Suas informações clínicas:</h2>
        <SelectInput
          id="tipoSanguineo"
          label="Tipo sanguíneo"
          onChange={handleChange}
          value={formData.tipoSanguineo}
          options={tipoSanguineoOptions}
          required={true}
        />
        <TextArea
          id="alergias"
          label="Alergias"
          placeholder="Insira todas as suas alergias"
          maxLength={1000}
          onChange={handleChange}
          value={formData.alergias}
        />
        <TextArea
          id="medicamentos"
          label="Medicamentos utilizados"
          placeholder="Insira todos os medicamentos"
          maxLength={1000}
          onChange={handleChange}
          value={formData.medicamentos}
        />
        <TextArea
          id="doencas"
          label="Doenças"
          placeholder="Insira todas as suas doenças"
          maxLength={1000}
          onChange={handleChange}
          value={formData.doencas}
        />
        <TextArea
          id="cirurgias"
          label="Cirurgias realizadas"
          placeholder="Insira todas as cirugias"
          maxLength={1000}
          onChange={handleChange}
          value={formData.cirurgias}
        />

        <Button text={buttonText} disabled={!allFieldsFilledAndValid} />
      </form>
    </Main>
  );
}
