import React, { useState } from 'react';
import InputText from '../../components/InputText';
import Button from '../../components/Button';
import './Register.scss';
import InputSelect from '../../components/InputSelect';
import { countries, statesByCountry } from '../../utilities/mockData/countries';
import { state } from '../../utilities/mockData/State';
import { banktype } from '../../utilities/mockData/BankType';
import { documentType } from '../../utilities/mockData/DocumentType';
import Service from '../../Service';
import { useNavigate } from 'react-router-dom';
import { Config_base_url } from '../../utilities/Config/config';
import Spinner from '../../components/Spinner';
import '../global.scss';

const RegistrationPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<any>('');
  const [selectedState, setSelectedState] = useState<any>('');
  const [states, setStates] = useState<any>([]);

  const navigation = useNavigate();
  const [customerdata, setCustomerData] = useState<any>({
    name: '',
    username: '',
    password: '',
    address: '',
    email: '',
    contactNo: '',
    dob: '',
    branchName: '',
    country: '',
    state: '',
    accountType: '',
    identificationProofType: '',
  });
  const [errors, setErrors] = useState<any>({
    warning: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country: string = e.target.value;
    setSelectedCountry(country);

    const fetchedStates: string[] = statesByCountry[country] || [];
    setStates(fetchedStates);
    setSelectedState('');
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state: string = e.target.value;
    setSelectedState(state);
  };
  const handleChange = (key: string, value: string) => {
    console.log(key, value);
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^\d{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    if (key === 'name' && !nameRegex.test(value)) {
      isValid = false;
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        name: 'customer name should contain only alphabets and space',
      }));
    } else if (key === 'username' && value.length <= 5) {
      isValid = false;
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        username: 'user name must be above 5 characters',
      }));
    } else if (key === 'email') {
      if (!emailRegex.test(value)) {
        isValid = false;
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          email: 'Please enter a valid email address',
        }));
      } else {
        setErrors((prevErrors: any) => ({ ...prevErrors, email: '' }));
      }
    } else if (key === 'password' && value.length <= 5) {
      isValid = false;
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        password: 'Password must be at least 6 characters long',
      }));
    } else if (key === 'address' && value.length <= 3) {
      isValid = false;
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        address: 'All fields are mandatory. ',
      }));
    } else if (key === 'contactNo' && !contactRegex.test(value)) {
      isValid = false;
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        contactNo: 'Contact number should be 10 digits',
      }));
    } else if (key === 'dob') {
      const currentDate = new Date();

      const inputDate = new Date(value);

      currentDate.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);

      if (inputDate >= currentDate) {
        isValid = false;
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          dob: 'Date of birth cannot be a future date.',
        }));
      } else {
        setErrors((prevErrors: any) => ({ ...prevErrors, dob: '' }));
      }
    } else if (key === 'initialDepositAmount' && (!value || +value <= 0 || isNaN(+value))) {
      isValid = false;
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        initialDepositAmount: 'Initial deposit amount should be numeric greater than zero',
      }));
    } else {
      setErrors((prevErrors: any) => ({ ...prevErrors, [key]: '' }));
    }

    if (isValid) {
      setCustomerData((prevData: any) => ({ ...prevData, [key]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${Config_base_url}/customer/register`;
    const {
      name,
      username,
      password,
      address,
      email,
      country,
      contactNo,
      dob,
      branchName,
      accountType,
      initialDepositAmount,
      identificationProofType,
      identificationDocumentNo,
      state,
    } = customerdata;
    const postData = {
      name,
      username,
      password,
      address,
      email,
      country: selectedCountry,
      contactNo,
      dob,
      branchName,
      accountType,
      initialDepositAmount,
      identificationProofType,
      identificationDocumentNo,
    };

    const values = Object.values(customerdata);
    const isEmpty = values.every((value) => value !== '');

    if (!isEmpty) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        warning: 'please Enter all fields',
      }));

      return;
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        warning: '',
      }));

      setIsLoading(true);
      Service.postData(url, postData, onSucess, OnFailure);
    }
  };
  const onSucess = (response: any) => {
    if (response) {
      navigation('/login');
    }
  };
  const OnFailure = (response: any) => {
    setIsLoading(false);
    if (response) {
      navigation('/register');
    }
  };
  return (
    <div className="register-page-conatiner">
      <div className="registration-page">
        <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
          <InputText
            addClasses="input-Register"
            labelName="Name"
            name="name"
            onChangeHandler={(e) => handleChange('name', e.target.value)}
            required
          />
          {errors.name && <div className="error-message">{errors.name}</div>}

          <InputText
            addClasses="input-Register"
            labelName="Username"
            name="username"
            onChangeHandler={(e) => handleChange('username', e.target.value)}
            required
          />
          {errors.username && <div className="error-message">{errors.username}</div>}

          <InputText
            addClasses="input-Register"
            labelName="Password"
            type="password"
            name="password"
            onChangeHandler={(e) => handleChange('password', e.target.value)}
            required
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
          <InputText
            labelName="Address"
            addClasses="input-Register"
            name="address"
            onChangeHandler={(e) => handleChange('address', e.target.value)}
            required
          />

          {errors.address && <div className="error-message">{errors.address}</div>}

          <div>
            <label className="input-container">
              Country<span style={{ color: 'red' }}>*</span>
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="form-control input-Register country-select"
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label className="input-container">
              State<span style={{ color: 'red' }}>*</span>
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="form-control input-Register country-select1"
              >
                <option value="">Select State</option>
                {states.map((state: string, index: number) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <InputText
            labelName="Email"
            addClasses="input-Register"
            type="email"
            name="email"
            onChangeHandler={(e) => handleChange('email', e.target.value)}
            required
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
          <InputText
            labelName="Contact"
            addClasses="input-Register"
            name="contactNo"
            onChangeHandler={(e) => handleChange('contactNo', e.target.value)}
            required
          />
          {errors.contactNo && <div className="error-message">{errors.contactNo}</div>}
          <InputText
            labelName="Date of Birth"
            addClasses="input-Register"
            type="date"
            name="dob"
            onChangeHandler={(e) => handleChange('dob', e.target.value)}
            required
          />
          {errors.dob && <div className="error-message">{errors.dob}</div>}
          <InputSelect
            options={banktype}
            labelName="Account Type"
            customSelectClassNames="input-Register"
            placeholderText="Select BankType"
            name="accountType"
            onChangeHandler={(e) => handleChange('accountType', e.target.value)}
            required
          />
          <InputText
            labelName="Branch Name"
            addClasses="input-Register"
            name="branchName"
            onChangeHandler={(e) => handleChange('branchName', e.target.value)}
            required
          />
          <InputText
            labelName="Initial Deposit Amount"
            addClasses="input-Register"
            name="initialDepositAmount"
            onChangeHandler={(e) => handleChange('initialDepositAmount', e.target.value)}
            required
          />
          {errors.initialDepositAmount && (
            <div className="error-message">{errors.initialDepositAmount}</div>
          )}
          <InputSelect
            options={documentType}
            labelName="Identification Proof Type"
            customSelectClassNames="input-Register"
            placeholderText="Select Document"
            name="proofType"
            onChangeHandler={(e) => handleChange('identificationProofType', e.target.value)}
          />
          <InputText
            labelName="Identification Document No"
            addClasses="input-Register"
            name="identificationDocumentNo"
            onChangeHandler={(e) => handleChange('identificationDocumentNo', e.target.value)}
            required
          />
          {errors.warning && <div className="error-message">{errors.warning}</div>}
          <Button type="submit" buttonText="Register" addClass="user-Register" />
        </form>
        <Spinner isLoading={isLoading} />
      </div>
    </div>
  );
};

export default RegistrationPage;
