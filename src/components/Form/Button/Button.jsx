import "./Button.css";

export default function Button({ text, onClick, disabled }) {
  return (
    <button
      className={`btn ${disabled ? "faded-blue-bg" : "blue-bg"} white-txt ${disabled ? "cursor-default" : "cursor-pointer"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
