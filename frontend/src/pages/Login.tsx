import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
`;

const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

const SignupLink = styled.p`
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

const ForgotPassword = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  text-align: right;
  display: block;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    try {
      // Add your login API call here
      console.log('Form submitted:', formData);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>Welcome Back</Title>
        <Form onSubmit={handleSubmit}>
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
            <ForgotPassword to="/forgot-password">Forgot password?</ForgotPassword>
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit">Log In</SubmitButton>
        </Form>

        <SignupLink>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </SignupLink>
      </FormCard>
    </Container>
  );
};

export default Login; 