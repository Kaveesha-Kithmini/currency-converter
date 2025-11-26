import React, { useState } from 'react';
import styled from 'styled-components';
import { AccountFormData } from '../AccountCreation';
import authService from '../../../services/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AccountStepProps {
  formData: AccountFormData;
  onNext: () => void;
  updateFormData: (data: Partial<AccountFormData>) => void;
}

const AccountStep: React.FC<AccountStepProps> = ({ formData, onNext, updateFormData }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    submit: ''
  });

  // Set personal account type by default
  React.useEffect(() => {
    updateFormData({ accountType: 'personal' });
  }, [updateFormData]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain a capital letter';
    if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
    if (!/[0-9!@#$%^&*]/.test(password)) return 'Password must contain a number or symbol';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError,
      submit: ''
    });

    if (!emailError && !passwordError) {
      setIsLoading(true);
      try {
        await authService.signup({
          email: formData.email,
          password: formData.password,
          accountType: formData.accountType as 'personal' | 'business'
        });
        onNext();
      } catch (error: unknown) {
        const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Error creating account';
        
        setErrors(prev => ({
          ...prev,
          submit: errorMessage
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormValid = () => {
    return !validateEmail(formData.email) && !validatePassword(formData.password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Create a Personal Account</Title>
      
      <PersonalAccountBadge>
        <Icon>👤</Icon>
        Personal Account
      </PersonalAccountBadge>

      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="Enter your email"
          error={!!errors.email}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label>Password</Label>
        <PasswordContainer>
          <Input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            placeholder="Enter a password"
            error={!!errors.password}
          />
          <TogglePassword
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </TogglePassword>
        </PasswordContainer>
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        <PasswordRequirements>
          Must contain at least 8 characters, 1 capital letter, 1 lowercase letter, and 1 number or symbol
        </PasswordRequirements>
      </FormGroup>

      {errors.submit && <ErrorText>{errors.submit}</ErrorText>}

      <Button 
        type="submit" 
        disabled={!isFormValid() || isLoading}
      >
        {isLoading ? (
          <ButtonContent>
            <LoadingDots>
              <Dot />
              <Dot />
              <Dot />
            </LoadingDots>
          </ButtonContent>
        ) : (
          <ButtonContent>
            Continue
            <ArrowIcon>→</ArrowIcon>
          </ButtonContent>
        )}
      </Button>

      <SignInLink href="/signin">
        Already have an account? Sign in
      </SignInLink>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
  text-align: center;
`;

const PersonalAccountBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: ${props => props.theme.colors.primary + '10'};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 6px;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  margin-bottom: 0.75rem;
`;

const Icon = styled.span`
  font-size: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const Input = styled.input<{ error?: boolean }>`
  padding: 0.6rem;
  border: 2px solid ${props => props.error ? 'red' : '#e0e0e0'};
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.error ? 'red' : props.theme.colors.primary};
  }
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const TogglePassword = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.75rem;
`;

const PasswordRequirements = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.25rem;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ArrowIcon = styled.span`
  font-size: 1.1rem;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Dot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background: white;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
  animation-fill-mode: both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }

  &:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%, 80%, 100% { 
      transform: scale(0);
    }
    40% { 
      transform: scale(1.0);
    }
  }
`;

const SignInLink = styled.a`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export default AccountStep; 