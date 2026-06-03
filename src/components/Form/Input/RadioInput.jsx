import InputContainer from "./InputContainer";

export default function RadioInput({ id, label, placeholder, onChange, value, radioOptions, hasError, errorMsg, required }) {
  return (
    <InputContainer label={label} hasError={hasError} errorMsg={errorMsg} required={required}>
      <div className="radio-container">
        {radioOptions.map((radioOption, index) => {
          return (
            <div className="radio-box" key={index}>
              <input
                className="radio-input"
                id={radioOption.id}
                name={id}
                type="radio"
                onChange={onChange}
                value={radioOption.value}
                checked={value === radioOption.value}
                required={true}
              />
              <label className="radio-label" htmlFor={radioOption.id}>
                {radioOption.label}
              </label>
            </div>
          );
        })}
      </div>
    </InputContainer>
  );
}
