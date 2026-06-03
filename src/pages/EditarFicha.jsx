import { useLocation } from "react-router-dom";

import ClinicalDataForm from "../layouts/ClinicalDataForm";

export default function EditarFicha() {
  const location = useLocation();

  const clinicalData = location.state?.clinicalData ?? null;

  return <ClinicalDataForm title="Editar dados clinicos" buttonText="Finalizar edição" clinicalData={clinicalData} />;
}
