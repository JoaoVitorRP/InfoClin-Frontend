import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useParams } from "react-router-dom";

import PublicViewCard from "../components/ClinicalDataCard/PublicViewCard";
import Logo from "../components/Logo/Logo";
import Auth from "../layouts/Auth";
import SenhaInput from "../components/Form/Input/SenhaInput";
import Button from "../components/Form/Button/Button";

import { publicLogin } from "../services/clinicalDataService";

export default function FichaPublica() {
  const [isLoading, setIsLoading] = useState(false);
  const [clinicalData, setClinicalData] = useState(null);
  const [senhaPublica, setSenhaPublica] = useState("");

  const { codigo } = useParams();

  const handlePublicLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await publicLogin({ codigo, senhaPublica });

      setClinicalData(response?.data);
    } catch (err) {
      toast.error(err.status == 401 ? "Senha inválida." : `Erro ao buscar dados da ficha: (${err.status}) ${err.response.data}`, {
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
      {clinicalData && !isLoading && (
        <main className="flex-column">
          <Logo isHeader={false} />
          <PublicViewCard clinicalData={clinicalData} />
        </main>
      )}

      {!clinicalData && (
        <Auth isLoading={isLoading} handleSubmit={handlePublicLogin}>
          <SenhaInput
            id="senhaPublica"
            label="Senha pública"
            placeholder="Insira a senha"
            onChange={(e) => {
              setSenhaPublica(e.target.value);
            }}
            value={senhaPublica}
          />
          <Button text="Validar" disabled={senhaPublica.trim().length === 0} />
        </Auth>
      )}
    </>
  );
}
