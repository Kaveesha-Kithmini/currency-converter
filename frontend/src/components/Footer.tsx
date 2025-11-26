import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.navbarText};
  padding: 3rem 0 2rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Section = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.navbarText};
    text-transform: uppercase;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.navbarText};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.navbarText};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Copyright = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  color: ${({ theme }) => theme.colors.navbarText};
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container>
        <Grid>
          {/* Quick Links */}
          <Section>
            <h3>Quick Links</h3>
            <List>
              <li>
                <StyledLink to="/">Currency Converter</StyledLink>
              </li>
              <li>
                <StyledLink to="/exchange-rates">Exchange Rates</StyledLink>
              </li>
              <li>
                <StyledLink to="/about">About Us</StyledLink>
              </li>
              <li>
                <StyledLink to="/privacy">Privacy Policy</StyledLink>
              </li>
              <li>
                <StyledLink to="/terms">Terms of Service</StyledLink>
              </li>
            </List>
          </Section>

          {/* Currency Information */}
          <Section>
            <h3>Currency Information</h3>
            <List>
              <li>
                <StyledLink to="/popular-currencies">Popular Currencies</StyledLink>
              </li>
              <li>
                <StyledLink to="/historical-rates">Historical Rates</StyledLink>
              </li>
              <li>
                <StyledLink to="/currency-news">Currency News</StyledLink>
              </li>
              <li>
                <StyledLink to="/currency-charts">Currency Charts</StyledLink>
              </li>
              <li>
                <StyledLink to="/currency-calculator">Currency Calculator</StyledLink>
              </li>
            </List>
          </Section>

          {/* Contact Us */}
          <Section>
            <h3>Contact Us</h3>
            <address className="not-italic">
              <p>Aerox Currency Services</p>
              <p>123 Financial District</p>
              <p>New York, NY 10001</p>
              <p>
                Email:{" "}
                <ContactLink href="mailto:support@aerox.com">
                  support@aerox.com
                </ContactLink>
              </p>
              <p>
                Phone:{" "}
                <ContactLink href="tel:+11234567890">
                  +1 (123) 456-7890
                </ContactLink>
              </p>
            </address>
          </Section>
        </Grid>

        <Copyright>
          <p>© {new Date().getFullYear()} Aerox Currency Converter. All rights reserved.</p>
        </Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 