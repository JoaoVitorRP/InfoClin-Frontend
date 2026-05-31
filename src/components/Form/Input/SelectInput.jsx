import InputContainer from "./InputContainer";

export default function SelectInput({ id, label, onChange, value, options, hasError, errorMsg, required }) {
  return (
    <InputContainer id={id} label={label} hasError={hasError} errorMsg={errorMsg} required={required}>
      <select
        id={id}
        className={`input light-gray-bg ${hasError ? "input-error" : ""}`}
        name={id}
        onChange={onChange}
        value={value}
        required={required}
      >
        {options.map((option, index) => {
          return (
            <option value={option.value} key={index}>
              {option.label}
            </option>
          );
        })}
      </select>
    </InputContainer>
  );
}
