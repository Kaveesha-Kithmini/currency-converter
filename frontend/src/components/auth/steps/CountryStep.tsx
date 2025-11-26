import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AccountFormData } from '../AccountCreation';

interface CountryStepProps {
  formData: AccountFormData;
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: Partial<AccountFormData>) => void;
}

interface Country {
  code: string;
  name: string;
  flag: string;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  // Add more countries as needed
];

const CountryStep: React.FC<CountryStepProps> = ({
  formData,
  onNext,
  onBack,
  updateFormData
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    formData.country ? countries.find(c => c.code === formData.country) || null : null
  );
  const [error, setError] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    updateFormData({ country: country.code });
    setSearchQuery(country.name);
    setIsDropdownOpen(false);
    setError('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry) {
      setError('Please select a country');
      return;
    }
    onNext();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Where do you live?</Title>
      
      <FormGroup>
        <Label>Country of residence</Label>
        <SearchContainer ref={dropdownRef}>
          <SearchInput
            type="text"
            placeholder="Select country or start typing..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
          />
          {selectedCountry && (
            <SelectedFlag>{selectedCountry.flag}</SelectedFlag>
          )}
          {isDropdownOpen && (
            <DropdownList>
              {filteredCountries.length > 0 ? (
                filteredCountries.map(country => (
                  <CountryOption
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    selected={selectedCountry?.code === country.code}
                  >
                    <CountryFlag>{country.flag}</CountryFlag>
                    <CountryName>{country.name}</CountryName>
                    <CountryCode>{country.code}</CountryCode>
                  </CountryOption>
                ))
              ) : (
                <NoResults>No countries found</NoResults>
              )}
            </DropdownList>
          )}
        </SearchContainer>

        {error && <ErrorText>{error}</ErrorText>}
      </FormGroup>

      <ButtonContainer>
        <BackButton type="button" onClick={onBack}>
          Back
        </BackButton>
        <ContinueButton type="submit">
          Continue
        </ContinueButton>
      </ButtonContainer>
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-left: ${props => props.value ? '2.5rem' : '0.75rem'};
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SelectedFlag = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 250px;
  overflow-y: auto;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const CountryOption = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? props.theme.colors.primary + '10' : 'white'};

  &:hover {
    background: ${props => props.theme.colors.primary + '20'};
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`;

const CountryFlag = styled.span`
  font-size: 1.2rem;
  margin-right: 0.75rem;
`;

const CountryName = styled.span`
  flex: 1;
  font-size: 0.9rem;
`;

const CountryCode = styled.span`
  color: #666;
  font-size: 0.8rem;
  margin-left: 0.75rem;
`;

const NoResults = styled.div`
  padding: 0.75rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.75rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const BackButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const ContinueButton = styled.button`
  flex: 2;
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

export default CountryStep; 