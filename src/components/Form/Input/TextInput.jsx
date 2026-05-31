import InputContainer from "./InputContainer";

import "./Input.css";

export default function TextInput({ id, label, placeholder, onChange, value, hasError, errorMsg, required }) {
  return (
    <InputContainer id={id} label={label} hasError={hasError} errorMsg={errorMsg} required={required}>
      <input
        id={id}
        className={`input light-gray-bg ${hasError ? "input-error" : ""}`}
        name={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={required}
      ></input>
    </InputContainer>
  );
}
