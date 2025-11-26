import React, { useState } from 'react';
import styled from 'styled-components';
import AccountStep from './steps/AccountStep';
import VerificationStep from './steps/VerificationStep';
import CountryStep from './steps/CountryStep';
import InfoStep from './steps/InfoStep';

export type AccountFormData = {
  accountType: 'personal' | 'business';
  email: string;
  password: string;
  verificationCode: string;
  country: string;
  fullName: string;
  preferredCurrency: string;
  wantUpdates: boolean;
};

const AccountCreation: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AccountFormData>({
    accountType: 'personal',
    email: '',
    password: '',
    verificationCode: '',
    country: '',
    fullName: '',
    preferredCurrency: '',
    wantUpdates: false
  });

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const updateFormData = (data: Partial<AccountFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AccountStep formData={formData} onNext={handleNext} updateFormData={updateFormData} />;
      case 2:
        return <VerificationStep formData={formData} onNext={handleNext} onBack={handleBack} updateFormData={updateFormData} />;
      case 3:
        return <CountryStep formData={formData} onNext={handleNext} onBack={handleBack} updateFormData={updateFormData} />;
      case 4:
        return <InfoStep formData={formData} onBack={handleBack} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <ProgressBar>
        <Progress width={(step / 4) * 100} />
      </ProgressBar>
      <StepIndicator>
        <StepText active={step >= 1}>Account</StepText>
        <StepText active={step >= 2}>Verification</StepText>
        <StepText active={step >= 3}>Country</StepText>
        <StepText active={step >= 4}>Info</StepText>
      </StepIndicator>
      {renderStep()}
    </Container>
  );
};

const Container = styled.div`
  max-width: 400px;
  margin: 1rem auto;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 3px;
  background: #e0e0e0;
  border-radius: 1.5px;
  margin-bottom: 1rem;
`;

const Progress = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 100%;
  background: ${props => props.theme.colors.primary};
  border-radius: 1.5px;
  transition: width 0.3s ease;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.85rem;
`;

const StepText = styled.span<{ active: boolean }>`
  color: ${props => props.active ? props.theme.colors.primary : '#999'};
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;
`;

export default AccountCreation; 