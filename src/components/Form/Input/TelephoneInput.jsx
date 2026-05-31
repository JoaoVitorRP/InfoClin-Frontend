import { useMaskInput } from "use-mask-input";

import InputContainer from "./InputContainer";

import "./Input.css";

export default function TelephoneInput({ id, label, onChange, value, hasError, errorMsg, required }) {
  const maskRef = useMaskInput({
    mask: "(99) 99999-9999",
  });

  return (
    <InputContainer id={id} label={label} hasError={hasError} errorMsg={errorMsg} required={required}>
      <input
        id={id}
        className={`input light-gray-bg ${hasError ? "input-error" : ""}`}
        name={id}
        ref={maskRef}
        onChange={onChange}
        value={value}
        placeholder="(__) _____-____"
        required={required}
      />
    </InputContainer>
  );
}
