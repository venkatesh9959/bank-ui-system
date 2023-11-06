import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './Dashboard.scss';
import '../global.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootStore';

const Dashboard: React.FC = () => {
  // const userData = {
  //   userName: 'Mannem Venkatesh',
  //   accountNO: '1234567890',
  //   phoneno: '9959693292',
  //   accountBalance: '1000',
  //   dateOfBirth: '20/07/1994',
  // };
  const data: any = useSelector((state: RootState) => state.login?.user);
  // console.log(filteruser);

  return (
    <div className="mainpage">
      <Header />
      <div className="content-section">
        <Sidebar />
        <div className="account-Data">
          <h3> Account Summary</h3>
          {data ? (
            <table className="account-table">
              <tbody>
                <tr>
                  <td>UserName:</td>
                  <td>{data?.status.name}</td>
                </tr>
                <tr>
                  <td>Account Number:</td>
                  <td>{data?.status?.accountNo}</td>
                </tr>
                <tr>
                  <td>Phone Number:</td>
                  <td>{data?.status?.contactNo}</td>
                </tr>
                <tr>
                  <td>Account Balance:</td>
                  <td>{data?.status?.accountBalance}</td>
                </tr>
                <tr>
                  <td>Date of Birth:</td>
                  <td>{data?.status?.dob}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <h2> No Data Available!</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
