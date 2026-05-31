import { useMaskInput } from "use-mask-input";

import InputContainer from "./InputContainer";

import "./Input.css";

export default function CpfInput({ onChange, value }) {
  const maskRef = useMaskInput({
    mask: "cpf",
  });

  return (
    <InputContainer id="cpf" label="CPF" required={true}>
      <input
        id="cpf"
        className="input light-gray-bg"
        name="cpf"
        ref={maskRef}
        onChange={onChange}
        value={value}
        placeholder="___.___.___-__"
        required={true}
      />
    </InputContainer>
  );
}
