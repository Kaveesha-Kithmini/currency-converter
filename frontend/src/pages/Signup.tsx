import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Container = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ImageSection = styled.div`
  flex: 1;
  background-image: url('/signup.jpg');
  background-size: cover;
  background-position: center;
  min-height: 600px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const ImageText = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  color: white;
  z-index: 1;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
    max-width: 400px;
  }
`;

const FormSection = styled.div`
  flex: 1;
  padding: 3rem;
  background: ${({ theme }) => theme.colors.card};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Add your signup API call here
      console.log('Form submitted:', formData);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <PageContainer>
      <Container>
        <ImageSection>
          <ImageText>
            <h2>Join Our Global Community</h2>
            <p>Access real-time currency exchange rates and make secure transactions worldwide.</p>
          </ImageText>
        </ImageSection>
        <FormSection>
          <Title>Create Account</Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton type="submit">Sign Up</SubmitButton>
          </Form>

          <LoginLink>
            Already have an account? <Link to="/login">Log in</Link>
          </LoginLink>
        </FormSection>
      </Container>
    </PageContainer>
  );
};

export default Signup; 