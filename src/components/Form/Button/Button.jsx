import "./Button.css";

export default function Button({ text, disabled }) {
  return (
    <button
      className={`btn ${disabled ? "faded-blue-bg" : "blue-bg"} white-txt ${disabled ? "cursor-default" : "cursor-pointer"}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
