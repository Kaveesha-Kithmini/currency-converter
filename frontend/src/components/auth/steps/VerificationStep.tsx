import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AccountFormData } from '../AccountCreation';

interface VerificationStepProps {
  formData: AccountFormData;
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: Partial<AccountFormData>) => void;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
  formData,
  onNext,
  onBack,
  updateFormData
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = resendTimer > 0 && setInterval(() => {
      setResendTimer(prev => prev - 1);
    }, 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendTimer]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    updateFormData({ verificationCode: newCode.join('') });

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (/[0-9]/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }
    
    setCode(newCode);
    updateFormData({ verificationCode: newCode.join('') });
  };

  const handleResendCode = () => {
    // Mock resend code functionality
    setResendTimer(30);
    setError('');
    // Here you would typically call an API to resend the code
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    // Mock verification - in real app, you'd verify with backend
    if (verificationCode === '123456') {
      onNext();
    } else {
      setError('Invalid verification code');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Verify Your Email</Title>
      <Subtitle>
        We've sent a 6-digit code to {formData.email}
      </Subtitle>

      <CodeContainer>
        {code.map((digit, index) => (
          <CodeInput
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            maxLength={1}
            value={digit}
            onChange={e => handleInputChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onPaste={handlePaste}
            pattern="[0-9]*"
            inputMode="numeric"
            autoComplete="off"
          />
        ))}
      </CodeContainer>

      {error && <ErrorText>{error}</ErrorText>}

      <ResendContainer>
        {resendTimer > 0 ? (
          <ResendText>Resend code in {resendTimer}s</ResendText>
        ) : (
          <ResendButton type="button" onClick={handleResendCode}>
            Resend code
          </ResendButton>
        )}
      </ResendContainer>

      <ButtonContainer>
        <BackButton type="button" onClick={onBack}>
          Back
        </BackButton>
        <VerifyButton type="submit" disabled={code.some(digit => !digit)}>
          Verify and Continue
        </VerifyButton>
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
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 1rem;
`;

const CodeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;
`;

const CodeInput = styled.input`
  width: 3rem;
  height: 3rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.875rem;
  text-align: center;
`;

const ResendContainer = styled.div`
  text-align: center;
  margin: 1rem 0;
`;

const ResendText = styled.span`
  color: #666;
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
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

const VerifyButton = styled.button`
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

export default VerificationStep; 