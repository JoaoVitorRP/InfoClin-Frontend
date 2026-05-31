import InputContainer from "../Input/InputContainer";

import "../Input/Input.css";
import "./TextArea.css";

export default function TextArea({ id, label, placeholder, maxLength, onChange, value, hasError, errorMsg, required }) {
  return (
    <InputContainer id={id} label={label} hasError={hasError} errorMsg={errorMsg} required={required}>
      <div style={{ position: "relative", paddingBottom: "15px" }}>
        <textarea
          id={id}
          className={`text-area light-gray-bg ${hasError ? "input-error" : ""}`}
          name={id}
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          required={required}
        ></textarea>
        {maxLength && (
          <div className="char-count">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    </InputContainer>
  );
}
