import React, { useEffect, useState } from 'react';
import InputText from '../../components/InputText';
import InputSelect from '../../components/InputSelect';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import '../global.scss';
import './Profile.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootStore';
import { Config_base_url } from '../../utilities/Config/config';
import Service from '../../Service';

const ProfileDetails = () => {
  const [userProfile, setUserProfile] = useState<any>();
  const [errors, setErrors] = useState<any>({
    warning: '',
  });
  const handleChange = (key: string, value: string) => {};
  const handleSubmit = () => {};
  const [isLoading, setIsLoading] = useState(false);
  const data: any = useSelector((state: RootState) => state.login?.user);

  useEffect(() => {
    const url = `${Config_base_url}`;
    Service.getData(url, onSucessgetResponse);
  }, []);
  const onSucessgetResponse = (response: any) => {
    const userData = response;

    const filteruser = userData?.users?.find((info: any) => {
      return data?.status?._id === info?._id;
    });

    setUserProfile(filteruser);
  };
  return (
    <div className="mainpage">
      <Header />
      <div className="content-section">
        <Sidebar />
        <div className="form-container">
          <h1>Profile Details</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <div className="profile-row">
                <div className="profile-section">
                  <InputText
                    addClasses="input-form"
                    labelName="Name"
                    onChangeHandler={(e) => handleChange('name', e.target.value)}
                    required
                    value={userProfile?.name}
                  />
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>
                <div className="profile-section">
                  <InputText
                    addClasses="profile-form"
                    labelName="Username"
                    onChangeHandler={(e) => handleChange('username', e.target.value)}
                    required
                    value={userProfile?.username}
                  />
                  {errors.username && <div className="error-message">{errors.username}</div>}
                </div>
                <div className="profile-section">
                  <InputText
                    addClasses="profile-form"
                    labelName="Password"
                    type="password"
                    name="password"
                    onChangeHandler={(e) => handleChange('password', e.target.value)}
                    required
                  />
                  {errors.password && <div className="error-message">{errors.password}</div>}
                </div>
              </div>

              <div className="profile-row">
                <div className="profile-section">
                  <InputText
                    labelName="Address"
                    addClasses="input-form"
                    name="address"
                    onChangeHandler={(e) => handleChange('address', e.target.value)}
                    required
                    value={userProfile?.username}
                  />

                  {errors.address && <div className="error-message">{errors.address}</div>}
                </div>

                <div className="profile-section">
                  <InputSelect
                    options={[]}
                    labelName="Country"
                    customSelectClassNames="input-form profile-option"
                    placeholderText="Select Country"
                    onChangeHandler={(e) => handleChange('country', e.target.value)}
                    required
                    value={userProfile?.country}
                  />
                  {errors.country && <div className="error-message">{errors.country}</div>}
                </div>

                <div className="profile-section">
                  <InputSelect
                    options={[]}
                    labelName="State"
                    placeholderText="Select State"
                    customSelectClassNames="input-form profile-option"
                    onChangeHandler={(e) => handleChange('state', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="profile-row">
                <div className="loan-section">
                  <InputText
                    labelName="Email"
                    addClasses="input-form"
                    type="email"
                    name="email"
                    onChangeHandler={(e) => handleChange('email', e.target.value)}
                    required
                    value={userProfile?.email}
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                <div className="profile-section">
                  <InputText
                    labelName="Contact"
                    addClasses="input-form"
                    name="contact"
                    onChangeHandler={(e) => handleChange('contactNo', e.target.value)}
                    required
                    value={userProfile?.contactNo}
                  />
                  {errors.contactNo && <div className="error-message">{errors.contactNo}</div>}
                </div>
                <div className="profile-section">
                  <InputText
                    labelName="Date of Birth"
                    addClasses="profile-form"
                    type="date"
                    name="dob"
                    onChangeHandler={(e) => handleChange('dob', e.target.value)}
                    required
                    value={userProfile?.dob}
                  />
                  {errors.dob && <div className="error-message">{errors.dob}</div>}
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-section">
                  <InputSelect
                    options={[]}
                    labelName="Account Type"
                    customSelectClassNames="profile-form profile-option"
                    placeholderText="Select BankType"
                    name="accountType"
                    onChangeHandler={(e) => handleChange('accountType', e.target.value)}
                    required
                  />
                </div>

                <div className="profile-section">
                  <InputText
                    labelName="Initial Deposit Amount"
                    addClasses="profile-form"
                    name="initialDeposit"
                    onChangeHandler={(e) => handleChange('initialDepositAmount', e.target.value)}
                    required
                    value={userProfile?.initialDepositAmount}
                  />
                  {errors.initialDepositAmount && (
                    <div className="error-message">{errors.initialDepositAmount}</div>
                  )}
                </div>
                <div className="profile-section">
                  <InputSelect
                    options={[]}
                    labelName="Identification Proof Type"
                    customSelectClassNames="profile-form profile-option"
                    placeholderText="Select Document"
                    name="proofType"
                    onChangeHandler={(e) => handleChange('identificationProofType', e.target.value)}
                  />
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-section">
                  <InputText
                    labelName="Identification Document No"
                    addClasses="profile-form"
                    name="documentNo"
                    onChangeHandler={(e) =>
                      handleChange('identificationDocumentNo', e.target.value)
                    }
                    required
                    value={userProfile?.identificationDocumentNo}
                  />
                  {errors.warning && <div className="error-message">{errors.warning}</div>}
                </div>
              </div>
            </div>

            <Button type="submit" buttonText="UPDATE" addClass="button button-right" />
          </form>
          <Spinner isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
export default ProfileDetails;
