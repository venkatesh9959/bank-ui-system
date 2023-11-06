import React, { useState } from 'react';
import InputText from '../../components/InputText';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import '../global.scss';
import Button from '../../components/Button';
import './LoanApplication.scss';

enum LoanType {
  PersonalHomeLoan = 'personalHomeLoan',
  EducationLoan = 'educationLoan',
}
interface LoanDetails {
  accountHolderName: string;
  loanAmount: number;
  loanInitiateDate: string;
  interestRate: string;
  loanDuration: string;
  companyName: string;
  designation: string;
  totalExperience: number;
  expWithCurrentCompany: number;
  courseFee: number;
  course: string;
  fatherName: string;
  fatherOccupation: string;
  annualIncome: number;
}

const LoanApplication = () => {
  const [loanType, setLoanType] = useState<LoanType>();
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    accountHolderName: '',
    loanAmount: 0,
    loanInitiateDate: '',
    interestRate: '',
    loanDuration: '',
    companyName: '',
    designation: '',
    totalExperience: 0,
    expWithCurrentCompany: 0,
    courseFee: 0,
    course: '',
    fatherName: '',
    fatherOccupation: '',
    annualIncome: 0,
  });
  const [validationErrors, setValidationErrors] = useState<{
    loanAmount?: string;
    loanInitiateDate?: string;
    accountHolderName?: string;
    companyName?: string;
    designation?: string;
    totalExperience?: number;
    expWithCurrentCompany?: number;
    courseFee?: number;
    course?: string;
    fatherName?: string;
    fatherOccupation?: string;
    annualIncome?: number;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    let errorMessage: string | undefined = undefined;

    if (name === 'loanType') {
      setLoanType(value as LoanType);
      setLoanDetails({
        ...loanDetails,
        interestRate: value === LoanType.PersonalHomeLoan ? '14%' : '11%',
        loanDuration: value === LoanType.EducationLoan ? '10 years' : '15 years',
      });
    } else {
      setLoanDetails({
        ...loanDetails,
        [name]: value,
      });

      if (name === 'loanAmount') {
        if (!value) {
          errorMessage = 'Loan amount is required.';
        } else if (isNaN(parseInt(value))) {
          errorMessage = 'Value must be a number greater than zero.';
        } else if (parseFloat(value) <= 0) {
          errorMessage = 'Loan amount must be greater than zero.';
        }
      }

      if (name === 'loanInitiateDate') {
        const systemDate = new Date();
        const selectedDate = new Date(value);

        if (selectedDate < systemDate) {
          errorMessage = 'Loan apply date cannot be less than system date.';
        }
      }
      if (name === 'accountHolderName') {
        const regex = /^[a-zA-Z\s]+$/;
        if (!regex.test(value)) {
          errorMessage = 'name should contain only alphabets and space.';
        }
      }
      if (
        name === 'companyName' ||
        name === 'designation' ||
        name === 'course' ||
        name === 'fatherName' ||
        name === 'fatherOccupation'
      ) {
        const regex = /^[a-zA-Z\s]+$/;
        if (!regex.test(value)) {
          errorMessage = `${name} should contain only alphabets`;
        }
      }
      if (
        name === 'totalExperience' ||
        name === 'expWithCurrentCompany' ||
        name === 'courseFee' ||
        name === 'annualIncome'
      ) {
        if (!value) {
          errorMessage = `${name} is required.`;
        } else if (isNaN(parseInt(value))) {
          errorMessage = 'Value must be a number greater than zero.';
        }
      }
    }

    setValidationErrors({
      ...validationErrors,
      [name]: errorMessage || undefined,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loanType === LoanType.PersonalHomeLoan) {
      const {
        loanAmount,
        loanInitiateDate,
        interestRate,
        loanDuration,
        companyName,
        designation,
        totalExperience,
        expWithCurrentCompany,
      } = loanDetails;
    }
  };
  return (
    <div className="mainpage">
      <Header />
      <div className="content-section">
        <Sidebar />
        <div className="form-container">
          <h2 className="form-heading">Loan Application</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="loanType">Loan Type:</label>
              <select onChange={handleChange} required className="select-box" name="loanType">
                <option value="">Select</option>
                <option value={LoanType.PersonalHomeLoan}>Personal/Home Loan</option>
                <option value={LoanType.EducationLoan}>Education Loan</option>
              </select>
            </div>
            <div className="form-group row">
              <div className="input-row">
                <div className="loan-section">
                  <InputText
                    type="text"
                    value={loanDetails.accountHolderName}
                    labelName="Account Holder Name"
                    addClasses="input-form"
                    onChangeHandler={handleChange}
                    placeHolderText="Enter Name"
                    name="accountHolderName"
                  />
                  {validationErrors.accountHolderName && (
                    <p className="error-message">{validationErrors.accountHolderName}</p>
                  )}
                </div>
                <div className="loan-section">
                  <InputText
                    type="number"
                    value={loanDetails.loanAmount}
                    labelName="Loan Amount"
                    addClasses="input-form"
                    onChangeHandler={handleChange}
                    placeHolderText="Loan Amount"
                    name="loanAmount"
                  />
                  {validationErrors.loanAmount && (
                    <p className="error-message">{validationErrors.loanAmount}</p>
                  )}
                </div>
                <div className="loan-section">
                  <InputText
                    type="date"
                    value={loanDetails.loanInitiateDate}
                    onChangeHandler={handleChange}
                    labelName="Loan Apply Date"
                    addClasses="input-form date-width"
                    name="loanInitiateDate"
                  />
                  {validationErrors.loanInitiateDate && (
                    <p className="error-message">{validationErrors.loanInitiateDate}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="input-row">
                <InputText
                  type="text"
                  placeHolderText="Rate of Interest(%)"
                  labelName="Rate of Interest(%)"
                  addClasses="input-form"
                  value={loanDetails.interestRate}
                  disabled={loanDetails.interestRate ? true : false}
                />
                <InputText
                  type="text"
                  labelName="Duration of the Loan:"
                  addClasses="input-form"
                  name="loanDuration"
                  value={loanDetails.loanDuration}
                  disabled={(loanDetails.interestRate && true) || undefined}
                />
              </div>
            </div>

            {loanType === 'personalHomeLoan' && (
              <>
                <div className="form-group row">
                  <div className="input-row">
                    <div className="loan-section">
                      <InputText
                        type="text"
                        labelName="Company Name"
                        addClasses="input-form"
                        name="companyName"
                        value={loanDetails.companyName}
                        onChangeHandler={handleChange}
                      />
                      {validationErrors.companyName && (
                        <p className="error-message">{validationErrors.companyName}</p>
                      )}
                    </div>
                    <div className="loan-section">
                      <InputText
                        labelName="Designation"
                        type="text"
                        addClasses="input-form"
                        name="designation"
                        value={loanDetails.designation}
                        onChangeHandler={(e) => handleChange(e)}
                      />
                      {validationErrors.designation && (
                        <p className="error-message">{validationErrors.designation}</p>
                      )}
                    </div>
                    <div className="loan-section">
                      <InputText
                        labelName="Total Experience (in years)"
                        type="number"
                        addClasses="input-form"
                        name="totalExperience"
                        value={loanDetails.totalExperience}
                        onChangeHandler={(e) => handleChange(e)}
                      />
                      {validationErrors.totalExperience && (
                        <p className="error-message">{validationErrors.totalExperience}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="input-row">
                    <div className="loan-section">
                      <InputText
                        labelName="Exp with Current Company (in years)"
                        type="number"
                        name="expWithCurrentCompany"
                        addClasses="input-form"
                        value={loanDetails.expWithCurrentCompany}
                        onChangeHandler={(e) => handleChange(e)}
                      />
                      {validationErrors.expWithCurrentCompany && (
                        <p className="error-message">{validationErrors.expWithCurrentCompany}</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {loanType === 'educationLoan' && (
              <>
                <div className="form-group row">
                  <div className="input-row">
                    <div className="loan-section">
                      <InputText
                        labelName="Course Fee"
                        type="number"
                        addClasses="input-form"
                        name="courseFee"
                        value={loanDetails.courseFee}
                        onChangeHandler={(e) => handleChange(e)}
                      />
                      {validationErrors.courseFee && (
                        <p className="error-message">{validationErrors.courseFee}</p>
                      )}
                    </div>

                    <div className="loan-section">
                      <InputText
                        labelName="Course"
                        type="text"
                        addClasses="input-form"
                        name="course"
                        value={loanDetails.course}
                        onChangeHandler={(e) => handleChange(e)}
                      />
                      {validationErrors.course && (
                        <p className="error-message">{validationErrors.course}</p>
                      )}
                    </div>

                    <div className="loan-section">
                      <InputText
                        labelName="Father's Name"
                        type="text"
                        addClasses="input-form"
                        name="fatherName"
                        value={loanDetails.fatherName}
                        onChangeHandler={(e) => handleChange(e)}
                      />
                      {validationErrors.fatherName && (
                        <p className="error-message">{validationErrors.fatherName}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="input-row">
                    <div className="loan-section">
                      <InputText
                        labelName="Father's Occupation"
                        type="text"
                        addClasses="input-form"
                        name="fatherOccupation"
                        value={loanDetails.fatherOccupation}
                        onChangeHandler={(e) => handleChange(e)}
                      />
                      {validationErrors.fatherOccupation && (
                        <p className="error-message">{validationErrors.fatherOccupation}</p>
                      )}
                    </div>

                    <div className="loan-section">
                      <InputText
                        labelName="Annual income"
                        type="text"
                        addClasses="input-form"
                        name="annualIncome"
                        value={loanDetails.annualIncome}
                        onChangeHandler={(e) => handleChange(e)}
                      />
                      {validationErrors.annualIncome && (
                        <p className="error-message">{validationErrors.annualIncome}</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            <Button type="submit" addClass="button right-loan" buttonText="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
