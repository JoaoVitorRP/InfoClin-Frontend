import "./Input.css";

export default function InputContainer({ id, label, children, hasError, errorMsg }) {
  return (
    <div className="flex-column full-width input-container">
      <label htmlFor={id} className="input-label black-txt">
        {label}
      </label>
      {children}
      {hasError && <p className="error-text">{errorMsg}</p>}
    </div>
  );
}
