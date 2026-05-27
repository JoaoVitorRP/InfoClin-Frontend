import InputContainer from "./InputContainer";

import "./Input.css";

export default function SenhaInput({ id, label, placeholder, onChange, value, hasError, errorMsg }) {
  return (
    <InputContainer id={id} label={label} hasError={hasError} errorMsg={errorMsg}>
      <input
        id={id}
        className={`input light-gray-bg ${hasError ? "input-error" : ""}`}
        placeholder={placeholder}
        type="password"
        onChange={onChange}
        value={value}
        required={true}
      ></input>
    </InputContainer>
  );
}
