import React from 'react';
import { useNavigate } from 'react-router-dom';
import './scss/Sidebar.scss';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuChange = (data: string) => {
    navigate(`/${data}`);
  };

  return (
    <div className="sidebar">
      <div>
        <ul className="siderbar-section">
          <li className="menu-item" onClick={() => menuChange('dashboard')}>
            Account Summary
          </li>
          <li className="menu-item" onClick={() => menuChange('account-deposit')}>
            Account Deposit
          </li>
          <li className="menu-item" onClick={() => menuChange('loan-application')}>
            Apply Loan
          </li>
          <li className="menu-item" onClick={() => menuChange('profile-details')}>
            Profile Details
          </li>
        </ul>
      </div>
      <div>
        <ul className="siderbar-section">
          <li className="menu-item">FAQ</li>
          <li className="menu-item" onClick={() => menuChange('')}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
