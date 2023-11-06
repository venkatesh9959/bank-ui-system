import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  addClass?: string;
  buttonText: string;
  onClickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disable?: boolean;
  value?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  addClass,
  buttonText,
  onClickHandler,
  disable = false,
  value,
}) => {
  return (
    <button
      type={type}
      onClick={onClickHandler}
      className={addClass}
      disabled={disable}
      value={value}
      aria-label={buttonText}
    >
      {buttonText && buttonText}
    </button>
  );
};

export default Button;
