import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const Logo = styled(Link)`
  color: white !important;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:hover, &:visited, &:active, &:link {
    color: white;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  color: white;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white !important;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s ease;
  text-transform: uppercase;

  &:hover, &:visited, &:active, &:link {
    color: white;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 2rem;
  align-items: center;
`;

const AuthButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-size: 0.9rem;

  &.login {
    background: transparent;
    border: 1px solid white;
    color: white;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  &.signup {
    background: white;
    border: 1px solid white;
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background: rgba(255, 255, 255, 0.9);
    }
  }
`;

const UserIconButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  margin-left: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Nav>
      <Logo to="/">Aerox</Logo>
      <NavLinks>
        <NavLink to="/">Currency Converter</NavLink>
        <NavLink to="/exchange-rates">Exchange Rates</NavLink>
        <AuthButtons>
          <AuthButton className="login" onClick={() => navigate('/login')}>
            Login
          </AuthButton>
          <AuthButton className="signup" onClick={() => navigate('/signup')}>
            Sign Up
          </AuthButton>
          <UserIconButton onClick={() => navigate('/profile')} title="User Profile">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </UserIconButton>
        </AuthButtons>
      </NavLinks>
    </Nav>
  );
};

export default Navbar; 