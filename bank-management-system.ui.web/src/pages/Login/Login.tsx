import React, { useState } from 'react';
import InputText from '../../components/InputText';
import Button from '../../components/Button';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import Service from '../../Service';
import { Config_base_url } from '../../utilities/Config/config';
import Spinner from '../../components/Spinner';
import { useDispatch } from 'react-redux';
import { loginSucess } from '../../rootStore/usersReducers/user/usersReducer';
const Login: React.FC = () => {
  const [userdata, setUserdata] = useState<any>({});
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<any>({
    warning: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (key: string, value: string) => {
    console.log(key);
    let isValid = true;
    if (key === 'username' && value.length <= 5) {
      isValid = false;
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        username: 'Please enter A Valid username',
      }));
    } else if (key === 'password' && value.length <= 5) {
      isValid = false;
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        password: 'Please enter A Valid password',
      }));
    } else {
      setErrors((prevErrors: any) => ({ ...prevErrors, [key]: '' }));
    }

    if (isValid) {
      setUserdata((prevData: any) => ({ ...prevData, [key]: value }));
    }
  };
  const handleRemember = () => {
    setRememberMe(!rememberMe);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const url = `${Config_base_url}/customer/login`;

    Service.postData(url, userdata, onSucessResponse, Failure);
  };
  const onSucessResponse = (response: any) => {
    if (response.user) {
      dispatch(loginSucess(response));
      navigation('/dashboard');
    } else if (response.user === false) {
      setIsLoading(false);
      setErrors({ ...errors, warning: 'User Details are not found!' });
    }
  };
  const Failure = (response: any) => {
    setIsLoading(false);
    console.log(response);
    if (response) {
      navigation('/login');
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        {/* <h1>Welcome to online banking</h1> */}
        <form onSubmit={handleSubmit}>
          <InputText
            labelName="Username"
            type="text"
            addClasses="login-input"
            onChangeHandler={(e) => handleChange('username', e.target.value)}
            required
          />
          {errors.username && <div className="error-message">{errors.username}</div>}
          <InputText
            labelName="Password"
            type="password"
            addClasses="login-input"
            onChangeHandler={(e) => handleChange('password', e.target.value)}
            required
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
          <div className="checkbox">
            <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={handleRemember} />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <Button type="submit" addClass="user-login" buttonText="Login" disable={false} />
          <div className="error">
            {errors.warning && <div className="error-message">{errors.warning}</div>}
          </div>
        </form>
        <Spinner isLoading={isLoading} />

        <div className="register-link">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
