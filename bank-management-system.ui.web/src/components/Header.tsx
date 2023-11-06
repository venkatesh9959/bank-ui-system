import React from 'react';
import './scss/Header.scss';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="logo">
        <img
          src={
            'https://static.vecteezy.com/system/resources/thumbnails/013/948/616/small/bank-icon-logo-design-vector.jpg'
          }
          alt="Bank-Logo"
        />
      </div>
      <ul className="header-section">
        <li>
          <a href="#">My Account Profile</a>
        </li>
        <li>
          <a href="#">Bill Payment</a>
        </li>
        <li>
          <a href="#">Fixed Deposit</a>
        </li>
        <li>
          <a href="#">E-tax</a>
        </li>
        <li>
          <a href="#">E-services</a>
        </li>
        <li>
          <a href="#">Request and Enquire</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
