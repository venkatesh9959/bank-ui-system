import React from 'react';
interface Option {
  name?: string;
  code?: string;
  Id?: number;
}

interface InputSelectProps {
  options: Option[];
  placeholderText?: string;
  customSelectClassNames?: string;
  labelName?: string;
  value?: string | number;
  onChangeHandler?: (event: any) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
}

const InputSelect = (props: InputSelectProps) => {
  const {
    options,
    placeholderText,
    customSelectClassNames,
    labelName,
    value,
    onChangeHandler,
    name,
    disabled,
    required = true,
  } = props;

  return (
    <div className="input-container">
      {labelName && (
        <label htmlFor={name}>
          {labelName}
          {required && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      <fieldset>
        <select
          className={`form-control ${customSelectClassNames && customSelectClassNames}`}
          onChange={onChangeHandler}
          name={name}
          value={value}
          disabled={disabled}
        >
          {placeholderText && <option>{placeholderText}</option>}
          {options &&
            options.length > 0 &&
            options.map((option: Option, index: number) => (
              <option key={`${option.name}-option-${index}-${option.code}`} value={option.name}>
                {option.name && `${option.name}`}
              </option>
            ))}
        </select>
      </fieldset>
    </div>
  );
};

export default InputSelect;
