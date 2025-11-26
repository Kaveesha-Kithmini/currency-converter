import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExchangeRates from './pages/ExchangeRates';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Charts from './pages/Charts';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from './theme';
import UserProfile from './pages/UserProfile';

const GlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
  }
`;

const AppContainer = styled.div<{ theme: typeof theme }>`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  padding: 2rem;
  flex: 1;
`;

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Router>
      <AppContainer>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  </ThemeProvider>
);

export default App; 