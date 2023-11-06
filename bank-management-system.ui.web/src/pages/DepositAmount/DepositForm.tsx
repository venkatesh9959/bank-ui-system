import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import InputText from '../../components/InputText';
import InputSelect from '../../components/InputSelect';
import { banktype } from '../../utilities/mockData/BankType';
import './DepositAmount.scss';
import '../global.scss';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootStore';
import { Config_base_url } from '../../utilities/Config/config';
import Service from '../../Service';
import { useDispatch } from 'react-redux';
import { loginSucess } from '../../rootStore/usersReducers/user/usersReducer';
import Spinner from '../../components/Spinner';
const DepositForm: React.FC = () => {
  const [bankdepositdata, setBankDepositData] = useState<any>({
    deposit: '',
    accountNo: 0,
  });
  const [errors, setErrors] = useState<any>({});
  const [userinfo, setUserInfo] = useState<any>({});
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userData: any = useSelector((state: RootState) => state.login?.user);
  const handleChange = (key: string, value: string) => {
    if (key === 'accountNo') {
      if (!/^\d+$/.test(value)) {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          accountNo: 'Account number should only contain numeric characters',
        }));
        return;
      }
    }

    if (key === 'deposit') {
      if (!/^\d+$/.test(value)) {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          deposit: 'Please enter a valid numeric value for deposit',
        }));
        return;
      }
      // const depositAmount = +value;
      // const availableBalance = userData?.status?.accountBalance || 0;

      // if (depositAmount > availableBalance) {
      //   setErrors((prevErrors: any) => ({
      //     ...prevErrors,
      //     deposit: 'Deposit amount cannot exceed available balance',
      //   }));
      //   return;
      // }
    }

    setBankDepositData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));

    setErrors((prevData: any) => ({
      ...prevData,
      [key]: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { accountNo, deposit } = bankdepositdata;
    const url = `${Config_base_url}/customer/depositwithdraw`;

    const accountBalObj = {
      accountNo: accountNo,
      accountBalance: deposit,
    };

    Service.postData(url, accountBalObj, onSucessResponse);
    setIsLoading(true);
  };
  const onSucessResponse = (response: any) => {
    setUserInfo(response);
    setIsLoading(false);
    setBankDepositData({
      deposit: '',
      accountNo: '',
    });
  };
  useEffect(() => {
    if (userData) {
      setUserInfo(userData?.status);
    }
    onSucessResponse;
  }, []);
  return (
    <div className="mainpage">
      <Header />
      <div className="content-section">
        <Sidebar />
        <div className="account-Data">
          <h3> Account Deposit</h3>
        </div>
        <div className="form-deposit">
          <form>
            <InputSelect
              options={banktype}
              labelName="Account Type"
              placeholderText="select account Type"
              customSelectClassNames="form-deopsit-select"
              onChangeHandler={(e) => handleChange('accountType', e.target.value)}
              value={bankdepositdata.accountType}
            />
            <InputText
              type="text"
              labelName="Account No"
              placeHolderText="Enter account Number"
              addClasses="input-form"
              onChangeHandler={(e) => handleChange('accountNo', e.target.value)}
              value={bankdepositdata.accountNo || ''}
            />
            {errors.accountNo && <div className="error-message">{errors.accountNo}</div>}
            <InputText
              type="number"
              labelName="Depost Amount"
              placeHolderText="Enter depost amount"
              addClasses="input-form"
              onChangeHandler={(e) => handleChange('deposit', e.target.value)}
              value={bankdepositdata.deposit}
            />
            {errors.deposit && <div className="error-message">{errors.deposit}</div>}
            <InputText
              type="number"
              labelName="Available Balance"
              addClasses="input-form"
              value={userinfo?.accountBalance || ''}
              disabled={true}
            />
            <Button
              type="submit"
              buttonText="Deposit"
              onClickHandler={handleSubmit}
              addClass="button-deposit"
            />
          </form>
        </div>
        <Spinner isLoading={isLoading} />
      </div>
    </div>
  );
};
export default DepositForm;
