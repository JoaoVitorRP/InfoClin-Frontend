import { useLocation } from "react-router-dom";

import ClinicalDataForm from "../layouts/ClinicalDataForm";

export default function CadastrarFicha() {
  const location = useLocation();

  const clinicalData = location.state?.clinicalData ?? null;

  return <ClinicalDataForm title="Cadastrar dados clinicos" buttonText="Finalizar cadastro" clinicalData={clinicalData} />;
}
