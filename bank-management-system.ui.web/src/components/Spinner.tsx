import React from 'react';
import './scss/spinner.scss';

interface SpinnerProps {
  isLoading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="spinner-contanier">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
