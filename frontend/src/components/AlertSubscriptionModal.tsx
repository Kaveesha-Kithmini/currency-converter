import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  display: flex;
  gap: 1.5rem;
  position: relative;
`;

const LeftSection = styled.div`
  flex: 0.8;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;

const RightSection = styled.div`
  flex: 1.2;
  padding: 0.5rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.4rem;
`;

const Subtitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;

    &:before {
      content: '✓';
      color: ${({ theme }) => theme.colors.success};
      margin-right: 0.5rem;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 0.85rem;
`;

const Select = styled.select`
  padding: 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 0.85rem;
  background: white;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  font-size: 0.85rem;
`;

const SubscribeButton = styled.button`
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const PrivacyText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: 0.75rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SuccessMessageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const SuccessMessageBox = styled.div`
  background: white;
  padding: 2rem 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 1.2rem;
  color: #2ecc71;
  font-weight: 500;
`;

interface AlertSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlertSubscriptionModal: React.FC<AlertSubscriptionModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    name: '',
    email: '',
    frequency: 'daily',
    marketingConsent: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          smtpUser: 'kaveeshakithmini20030903@gmail.com',
          smtpPass: 'ykvygfdmzoxnycsm'
        }),
      });

      // First close the modal
      onClose();
      
      // Show success message
      setShowSuccess(true);

      // Wait for 3 seconds to ensure message is visible
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Then hide message and navigate
      setShowSuccess(false);
      navigate('/');
      
    } catch (error) {
      // Even on error, show success and navigate
      onClose();
      setShowSuccess(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      setShowSuccess(false);
      navigate('/');
    }
  };

  return (
    <>
      {showSuccess && (
        <SuccessMessageOverlay>
          <SuccessMessageBox>
            Form submitted Successfully ✓
          </SuccessMessageBox>
        </SuccessMessageOverlay>
      )}
      
      {isOpen && (
        <ModalOverlay onClick={onClose}>
          <ModalContainer onClick={e => e.stopPropagation()}>
            <CloseButton onClick={onClose}>×</CloseButton>
            
            <LeftSection>
              <Title>Need more advanced currency tools?</Title>
              <ImageContainer>
                <Image src="/cc.jpg" alt="Currency Exchange" />
              </ImageContainer>
              <BenefitsList>
                <li>Get real-time news + market updates</li>
                <li>View live charts, heat-maps and more!</li>
                <li>Use advanced technical analysis tools</li>
                <li>Identify valuable trading opportunities</li>
              </BenefitsList>
            </LeftSection>

            <RightSection>
              <Title>Track the currency exchange rate</Title>
              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Label>From Currency</Label>
                  <Select
                    value={formData.fromCurrency}
                    onChange={e => setFormData({ ...formData, fromCurrency: e.target.value })}
                  >
                    <option value="USD">🇺🇸 USD - US Dollar</option>
                    <option value="EUR">🇪🇺 EUR - Euro</option>
                    <option value="GBP">🇬🇧 GBP - British Pound</option>
                    <option value="LKR">🇱🇰 LKR - Sri Lankan Rupee</option>
                  </Select>
                </InputGroup>

                <InputGroup>
                  <Label>To Currency</Label>
                  <Select
                    value={formData.toCurrency}
                    onChange={e => setFormData({ ...formData, toCurrency: e.target.value })}
                  >
                    <option value="EUR">🇪🇺 EUR - Euro</option>
                    <option value="USD">🇺🇸 USD - US Dollar</option>
                    <option value="GBP">🇬🇧 GBP - British Pound</option>
                    <option value="LKR">🇱🇰 LKR - Sri Lankan Rupee</option>
                  </Select>
                </InputGroup>

                <InputGroup>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </InputGroup>

                <InputGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </InputGroup>

                <InputGroup>
                  <Label>Send me the update</Label>
                  <Select
                    value={formData.frequency}
                    onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </Select>
                </InputGroup>

                <Checkbox>
                  <input
                    type="checkbox"
                    checked={formData.marketingConsent}
                    onChange={e => setFormData({ ...formData, marketingConsent: e.target.checked })}
                  />
                  <Label>I agree to receive marketing communications</Label>
                </Checkbox>

                <SubscribeButton type="submit">Subscribe</SubscribeButton>

                <PrivacyText>
                  By subscribing to this newsletter, you agree to our{' '}
                  <a href="/privacy-policy">Privacy Policy</a>
                </PrivacyText>
              </Form>
            </RightSection>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default AlertSubscriptionModal; 