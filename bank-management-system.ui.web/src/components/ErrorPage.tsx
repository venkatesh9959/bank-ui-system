import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops!</h1>
      <h2>Something Went Wrong!</h2>
    </div>
  );
};

export default ErrorPage;
