import React, { useState } from 'react';
import styled from 'styled-components';
import { AccountFormData } from '../AccountCreation';
import { useNavigate } from 'react-router-dom';

interface InfoStepProps {
  formData: AccountFormData;
  onBack: () => void;
  updateFormData: (data: Partial<AccountFormData>) => void;
}

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  // Add more currencies as needed
];

const InfoStep: React.FC<InfoStepProps> = ({
  formData,
  onBack,
  updateFormData
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    preferredCurrency: ''
  });

  const validateForm = () => {
    const newErrors = {
      firstName: !formData.fullName ? 'First name is required' : '',
      lastName: '',
      preferredCurrency: !formData.preferredCurrency ? 'Please select a preferred currency' : ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call - in real app, you'd send data to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to profile page with user data
      navigate('/profile', { 
        state: {
          accountType: formData.accountType,
          email: formData.email,
          country: formData.country,
          fullName: formData.fullName,
          preferredCurrency: formData.preferredCurrency,
          wantUpdates: formData.wantUpdates
        },
        replace: true
      });
    } catch (error) {
      console.error('Error creating account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Personal information</Title>
      
      <InfoBox>
        <InfoIcon>ℹ️</InfoIcon>
        <InfoText>
          Please make sure that your name below matches your official documents
        </InfoText>
      </InfoBox>

      <FormGroup>
        <Label>First name</Label>
        <Input
          type="text"
          value={formData.fullName}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
          placeholder="Enter your first name"
          error={!!errors.firstName}
        />
        {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label>Middle name (optional)</Label>
        <Input
          type="text"
          placeholder="Enter your middle name"
        />
      </FormGroup>

      <FormGroup>
        <Label>Last name(s)</Label>
        <Input
          type="text"
          placeholder="Enter all of your names"
        />
        <HelpText>If you have multiple last names, please enter them all</HelpText>
      </FormGroup>

      <FormGroup>
        <Label>Preferred currency</Label>
        <Select
          value={formData.preferredCurrency}
          onChange={(e) => updateFormData({ preferredCurrency: e.target.value })}
          error={!!errors.preferredCurrency}
        >
          <option value="">Select a currency</option>
          {currencies.map(currency => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name} ({currency.symbol})
            </option>
          ))}
        </Select>
        {errors.preferredCurrency && <ErrorText>{errors.preferredCurrency}</ErrorText>}
      </FormGroup>

      <CheckboxGroup>
        <Checkbox
          type="checkbox"
          checked={formData.wantUpdates}
          onChange={(e) => updateFormData({ wantUpdates: e.target.checked })}
          id="updates"
        />
        <CheckboxLabel htmlFor="updates">
          I want to receive daily exchange rate updates
        </CheckboxLabel>
      </CheckboxGroup>

      <ButtonContainer>
        <BackButton type="button" onClick={onBack}>
          Back
        </BackButton>
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <ButtonContent>
              <LoadingDots>
                <Dot />
                <Dot />
                <Dot />
              </LoadingDots>
            </ButtonContent>
          ) : (
            'Create Account'
          )}
        </SubmitButton>
      </ButtonContainer>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  text-align: center;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.theme.colors.primary + '10'};
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const InfoIcon = styled.span`
  font-size: 1.5rem;
`;

const InfoText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
  margin: 0;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input<{ error?: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${props => props.error ? 'red' : '#e0e0e0'};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.error ? 'red' : props.theme.colors.primary};
  }
`;

const Select = styled.select<{ error?: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${props => props.error ? 'red' : '#e0e0e0'};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.error ? 'red' : props.theme.colors.primary};
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.875rem;
`;

const HelpText = styled.span`
  color: #666;
  font-size: 0.875rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
`;

const CheckboxLabel = styled.label`
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const BackButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  flex: 2;
  padding: 1rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

const LoadingDots = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  background-color: white;
  border-radius: 50%;
  animation: bounce 0.5s infinite alternate;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-4px);
    }
  }
`;

export default InfoStep; 