import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

import { useAuth } from "../contexts/AuthContext";
import { getClinicalDataByUserId } from "../services/clinicalDataService";

import Main from "../layouts/Main";
import Button from "../components/Form/Button/Button";
import PatientViewCard from "../components/ClinicalDataCard/PatientViewCard";

export default function Inicio() {
  const location = useLocation();

  const clinicalDataViaLocation = location.state?.clinicalData;

  const [clinicalData, setClinicalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData?.id) return;

        const response = await getClinicalDataByUserId(userData.id);

        setClinicalData(response?.data);
      } catch (err) {
        toast.error(`Erro ao buscar informações clínicas do usuário: (${err.status}) ${err.response?.data}`, {
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

    if (clinicalDataViaLocation) {
      setClinicalData(clinicalDataViaLocation);
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, []);

  return (
    <Main title="Seus dados clínicos" isLoading={isLoading}>
      {!clinicalData && !isLoading && (
        <>
          <p style={{ marginBottom: "15px" }}>
            <b>Você não possui informações clínicas cadastradas :(</b>
          </p>
          <Button text="Cadastrar dados" onClick={() => navigate("/cadastrar-ficha", { state: { clinicalData } })} />
        </>
      )}
      {clinicalData && !isLoading && <PatientViewCard clinicalData={clinicalData} />}
    </Main>
  );
}
