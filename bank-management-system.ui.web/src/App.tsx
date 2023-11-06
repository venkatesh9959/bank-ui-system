import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './rootStore';

const HomePage = lazy(() => import('./components/HomePage'));
const Login = lazy(() => import('./pages/Login/Login'));
const RegistrationPage = lazy(() => import('./pages/Register/Register'));
const ErrorPage = lazy(() => import('./components/ErrorPage'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const DepositForm = lazy(() => import('./pages/DepositAmount/DepositForm'));
const LoanApplication = lazy(() => import('./pages/LoanPage/LoanApplication'));
const ProfileDetails = lazy(() => import('./pages/ProfileEdits/ProfileDetails'));

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <RegistrationPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/account-deposit',
    element: <DepositForm />,
  },
  {
    path: '/loan-application',
    element: <LoanApplication />,
  },
  {
    path: '/profile-details',
    element: <ProfileDetails />,
  },
]);

const App = () => {
  return (
    <Provider store={appStore}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={AppRouter} />
      </Suspense>
    </Provider>
  );
};

export default App;
