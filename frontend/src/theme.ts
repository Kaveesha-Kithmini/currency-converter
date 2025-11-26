import { Theme } from './types/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

const theme: Theme = {
  colors: {
    primary: '#0a1a3c', // dark blue
    secondary: '#1e2a47',
    accent: '#3a7bd5',
    background: '#ffffff', // changed to white
    card: '#f5f5f5', // light gray for cards
    text: '#333333', // dark text for better contrast on white
    input: '#f0f0f0', // light gray for inputs
    border: '#e0e0e0', // light gray for borders
    button: '#3a7bd5',
    buttonText: '#ffffff',
    error: '#ff4d4f',
    navbarText: '#ffffff', // new color for navbar text
    success: '#52c41a', // new color for success states
    textLight: '#666666', // new color for light text
  },
};

export default theme; 