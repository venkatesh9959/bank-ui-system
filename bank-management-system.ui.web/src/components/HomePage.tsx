import React from 'react';
import './scss/Homepage.scss';
import { Link } from 'react-router-dom';
const HomePage: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to Our Bank</h1>
      <div className="user-section">
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
      <div className="bank-body">
        <div className="features">
          <ul>
            <li>Competitive Interest Rates</li>
            <li>Low Interest Loans</li>
            <li>Gold Loan Options</li>
            <li>Corporate Loan Packages</li>
          </ul>
        </div>
        <div className="account-section">
          <div className="account-type">
            <h3>Student Bank Account</h3>
            <p>Designed for students with special benefits like:</p>
            <ul>
              <li>No minimum balance requirements</li>
              <li>Discounted fees on educational loans</li>
            </ul>
          </div>
          <div className="account-type">
            <h3>Senior Citizen Account</h3>
            <p>Exclusive benefits for senior citizens including:</p>
            <ul>
              <li>Higher interest rates on savings</li>
              <li>Priority service and support</li>
              <li>Discounts on select services</li>
            </ul>
          </div>
          <div className="account-type">
            <h3>Normal Bank Account</h3>
            <p>
              Our normal bank accounts offer a flexible and convenient way to manage your finances.
              Enjoy features such as:
            </p>
            <ul>
              <li>No minimum balance requirements</li>
              <li>Access to a wide network of ATMs</li>
              <li>Online banking for easy transactions</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
