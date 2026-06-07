import { MdOutlineDeleteForever, MdOutlineQrCodeScanner } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { cpfFormatter, telephoneFormatter } from "../../utils/formatters";
import { deleteClinicalData } from "../../services/clinicalDataService";

import "./ClinicalDataCard.css";

const MAP_SEXO = {
  M: "Masculino",
  F: "Feminino",
  NI: "Não Informado",
  X: "Outro",
};

const MAP_TIPO_SANGUINEO = {
  "A+": "A positivo (A+)",
  "A-": "A negativo (A-)",
  "B+": "B positivo (B+)",
  "B-": "B negativo (B-)",
  "AB+": "AB positivo (AB+)",
  "AB-": "AB negativo (AB-)",
  "O+": "O positivo (O+)",
  "O-": "O negativo (O-)",
};

export default function PatientViewCard({ clinicalData, hasDeleted, setHasDeleted }) {
  const { id, cpf, nome, sobrenome, sexo, nomeContato, telefoneContato, tipoSanguineo, alergias, medicamentos, doencas, cirurgias } =
    clinicalData;

  const handleDelete = () => {
    Swal.fire({
      title: "Você tem certeza que quer excluir seus dados clínicos?",
      text: "Essa ação não poderá ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C90000",
      cancelButtonColor: "#AAAAAA",
      confirmButtonText: "Sim, excluir item",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await deleteClinicalData(id);
          return true;
        } catch (err) {
          Swal.showValidationMessage(`Erro: (${err.status}) ${err.response?.data || err.message}`);
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        Swal.fire({
          title: "Excluído!",
          text: "Seus dados clínicos foram excluídos com sucesso.",
          icon: "success",
        });

        setHasDeleted(!hasDeleted);
      }
    });
  };

  return (
    <div className="patient-card white-bg">
      <div className="patient-card-content">
        <div className="patient-card-group">
          <h2 className="blue-txt patient-view-title">Paciente:</h2>
          <p>
            <b>CPF: </b>
            {cpfFormatter(cpf)}
          </p>
          <p>
            <b>Nome completo: </b>
            {nome} {sobrenome}
          </p>
          <p>
            <b>Sexo: </b>
            {MAP_SEXO[sexo]}
          </p>
        </div>

        <div className="patient-card-group">
          <h2 className="blue-txt patient-view-title">Contato de emergência:</h2>
          <p>
            <b>Nome: </b>
            {nomeContato}
          </p>
          <p>
            <b>Telefone: </b>
            {telephoneFormatter(telefoneContato)}
          </p>
        </div>

        <div className="patient-card-group">
          <h2 className="blue-txt patient-view-title">Informações clínicas:</h2>
          <p>
            <b>Tipo sanguíneo: </b>
            {MAP_TIPO_SANGUINEO[tipoSanguineo]}
          </p>
          <p>
            <b>Alergias: </b>
            {alergias || "Nenhuma"}
          </p>
          <p>
            <b>Medicamentos utilizados: </b>
            {medicamentos || "Nenhum"}
          </p>
          <p>
            <b>Doenças: </b>
            {doencas || "Nenhuma"}
          </p>
          <p>
            <b>Cirurgias realizadas: </b>
            {cirurgias || "Nenhuma"}
          </p>
        </div>
      </div>
      <div className="vertical-line blue-bg"></div>
      <div className="patient-card-sidebar">
        <Link to="/editar-ficha" state={{ clinicalData }}>
          <BiSolidEdit className="green-txt" style={{ fontSize: "30px" }} />
        </Link>
        <button className="invisible-btn" style={{ cursor: "pointer" }} onClick={handleDelete}>
          <MdOutlineDeleteForever className="red-txt" style={{ fontSize: "35px" }} />
        </button>

        <MdOutlineQrCodeScanner className="blue-txt" style={{ fontSize: "35px" }} />
      </div>
    </div>
  );
}
