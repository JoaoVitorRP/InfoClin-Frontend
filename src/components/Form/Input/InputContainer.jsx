import "./Input.css";

export default function InputContainer({ id, label, children, hasError, errorMsg, required }) {
  return (
    <div className="flex-column full-width input-container">
      <label htmlFor={id} className="input-label black-txt">
        {label}
        {required && <span className="red-txt"> *</span>}
      </label>
      {children}
      {hasError && <p className="error-text">{errorMsg}</p>}
    </div>
  );
}
