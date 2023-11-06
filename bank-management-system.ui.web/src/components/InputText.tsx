import React from 'react';

interface InputTextProps {
  labelName: string;
  iconName?: React.ReactNode;
  placeHolderText?: string;
  type?: 'text' | 'date' | 'email' | 'password' | 'radio' | 'number' | 'datetime-local' | 'file';
  addClasses?: string;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  staricon?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean | undefined;
}

const InputText = (props: InputTextProps) => {
  const {
    iconName,
    labelName,
    placeHolderText,
    type = 'text',
    addClasses,
    onChangeHandler,
    value,
    name,
    required = true,
    disabled,
  } = props;

  return (
    <div className="input-container">
      {labelName && (
        <label htmlFor={name}>
          {labelName}
          {required && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      <div>
        {iconName && (
          <div className="form-control-position">
            <i>{iconName}</i>
          </div>
        )}
        <input
          type={type}
          className={addClasses?.trim()}
          placeholder={placeHolderText}
          name={name}
          value={value}
          onChange={onChangeHandler}
          required={required}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default InputText;
