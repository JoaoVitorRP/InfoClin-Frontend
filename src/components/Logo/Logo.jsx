import "./Logo.css";

export default function Logo({ isHeader = true }) {
  return (
    <p className={`logo ${isHeader ? "logo-medio" : "logo-grande"}`}>
      <span className="blue-txt">Info</span>
      <span className="green-txt">Clin</span>
    </p>
  );
}
