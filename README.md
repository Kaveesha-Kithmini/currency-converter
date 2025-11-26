<div align="center">

# 💱 Currency Converter & Exchange Rate Lookup

### *Real-Time Currency Exchange at Your Fingertips*

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Styled Components](https://img.shields.io/badge/Styled_Components-5.3-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-integration) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Integration](#-api-integration)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

**Currency Converter & Exchange Rate Lookup** is a modern, responsive web application that provides real-time currency conversion and exchange rate information for multiple currencies worldwide. Built with React and TypeScript, it offers a seamless user experience with interactive charts, live rate updates, and user authentication features.

Whether you're a traveler, investor, or business professional, this application helps you stay informed about currency exchange rates with accurate, up-to-date information.

---

## ✨ Features

### 🔄 **Currency Conversion**
- Real-time currency conversion between 150+ currencies
- Intuitive swap functionality to quickly reverse conversion pairs
- Clean, user-friendly interface with instant results
- Support for decimal amounts and precise calculations

### 📊 **Interactive Charts**
- Historical exchange rate visualization
- Multiple timeframe options (12H, 1D, 1W, 1M, 1Y, 2Y, 5Y)
- Beautiful, responsive charts powered by Chart.js and Recharts
- Percentage change indicators
- Last updated timestamps

### 💱 **Live Exchange Rates**
- Comprehensive exchange rate table for all supported currencies
- Real-time rate updates
- Search functionality to quickly find specific currencies
- USD-based conversion rates from ExchangeRate-API

### 🎨 **Modern UI/UX**
- Responsive design that works on all devices
- Dark-themed interface with professional styling
- Smooth animations and transitions
- Styled-components for consistent theming
- Accessible and intuitive navigation

### 🚀 **Performance**
- Fast loading times
- Optimized API calls
- Efficient state management
- Error handling and loading states

---

## 🎯 Demo

### Quick Tour
1. **Home Page**: Convert currencies instantly with live rates
2. **Charts**: View historical exchange rate trends with multiple timeframes
3. **Exchange Rates**: Browse all available currency rates with search functionality

---


## 🛠 Tech Stack

### **Frontend**
- **React 18.2** - Modern UI library
- **TypeScript 4.9** - Type-safe JavaScript
- **React Router DOM 6.22** - Client-side routing
- **Styled Components 5.3** - CSS-in-JS styling
- **Axios 1.6** - HTTP client

### **Data Visualization**
- **Chart.js 4.4** - Flexible charting library
- **React-ChartJS-2 5.3** - React wrapper for Chart.js
- **Recharts 2.15** - Composable charting library

### **UI/UX**
- **React Toastify 11.0** - Toast notifications
- **Custom Theme System** - Consistent styling across the app

### **Build Tools**
- **React Scripts 5.0** - Create React App tooling
- **ESLint** - Code quality and consistency
- **Jest** - Testing framework

### **APIs**
- **ExchangeRate-API** - Real-time currency exchange rates

---

## 📦 Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git**

### Step 1: Clone the Repository
```bash
git clone https://github.com/Kaveesha-Kithmini/currency-converter.git
cd currency-converter
```

### Step 2: Install Root Dependencies
```bash
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 4: Start the Development Server
```bash
cd frontend
npm start
```

The application will open at `http://localhost:3000`

---

## 🚀 Usage

### Converting Currency
1. Navigate to the **Home** page
2. Enter the amount you want to convert
3. Select the **From** currency
4. Select the **To** currency
5. Click **Convert** to see the result
6. Use the swap button (↔) to reverse the currencies

### Viewing Charts
1. Click on **Charts** in the navigation
2. Select your desired currency pair
3. Choose a timeframe (12H, 1D, 1W, 1M, 1Y, 2Y, 5Y)
4. View historical trends and percentage changes

### Checking Exchange Rates
1. Go to **Exchange Rates** page
2. Browse all available currency rates
3. Use the search bar to find specific currencies
4. All rates are relative to USD base currency

---

## 🔌 API Integration

### ExchangeRate-API
```typescript
// Fetching live exchange rates
const response = await fetch(
  'https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD'
);
const data = await response.json();
const rates = data.conversion_rates;
```

**Features:**
- 150+ currencies supported
- Real-time rate updates
- High reliability and uptime
- Free tier available

---

## 📁 Project Structure

```
currency-converter/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── flags/           # Currency flag icons
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── AccountCreation.tsx
│   │   │   │   └── steps/
│   │   │   ├── charts/
│   │   │   │   ├── CurrencySelect.tsx
│   │   │   │   ├── ExchangeRateDisplay.tsx
│   │   │   │   ├── RateChart.tsx
│   │   │   │   └── TimeframeSelector.tsx
│   │   │   ├── AlertSubscriptionModal.tsx
│   │   │   ├── CurrencyConverter.tsx
│   │   │   ├── ExchangeRateLookup.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LiveRatesTable.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Navigation.tsx
│   │   ├── pages/
│   │   │   ├── Charts.tsx
│   │   │   ├── ExchangeRates.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── UserProfile.tsx
│   │   ├── services/
│   │   │   ├── api.ts          # API service layer
│   │   │   └── auth.ts         # Authentication service
│   │   ├── styles/
│   │   │   └── common.css
│   │   ├── types/
│   │   │   └── theme.ts
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── theme.ts
│   │   └── index.css
│   ├── package.json
│   └── tsconfig.json
├── package.json
├── .gitignore
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### 1. Fork the Repository
```bash
git fork https://github.com/Kaveesha-Kithmini/currency-converter.git
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/AmazingFeature
```

### 3. Commit Your Changes
```bash
git commit -m "Add some AmazingFeature"
```

### 4. Push to the Branch
```bash
git push origin feature/AmazingFeature
```

### 5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write clean, readable code
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Known Issues & Roadmap

### Current Issues
- Authentication UI exists but backend is not implemented yet
- Chart data uses mock/simulated historical data
- No database integration

### Future Enhancements
- [ ] Implement backend API with JWT authentication
- [ ] Add database integration for user management
- [ ] Add real historical data integration
- [ ] Implement rate alerts and notifications
- [ ] Mobile app version
- [ ] Export chart data to CSV/PDF
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Cryptocurrency support
- [ ] Offline mode with cached rates

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Contact

**Kaveesha Kithmini**

- GitHub: [@Kaveesha-Kithmini](https://github.com/Kaveesha-Kithmini)
- Repository: [currency-converter](https://github.com/Kaveesha-Kithmini/currency-converter)

---

## 🙏 Acknowledgments

- [ExchangeRate-API](https://www.exchangerate-api.com/) for providing reliable exchange rate data
- [React](https://reactjs.org/) team for the amazing framework
- [Chart.js](https://www.chartjs.org/) for beautiful chart components
- [Styled Components](https://styled-components.com/) for elegant styling solution
- All contributors who help improve this project

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ by Kaveesha Kithmini**

[⬆ Back to Top](#-currency-converter--exchange-rate-lookup)

</div>
