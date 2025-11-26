import React from 'react';
import styled from 'styled-components';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';

interface UserProfileData {
  accountType: 'personal' | 'business';
  email: string;
  country: string;
  fullName: string;
  preferredCurrency: string;
  wantUpdates: boolean;
}

const UserProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state as UserProfileData;

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container>
      <TopBar>
        <BackButton onClick={handleBack}>
          <BackIcon>←</BackIcon>
          Back to Home
        </BackButton>
      </TopBar>

      <ProfileCard>
        <Header>
          <Avatar>{userData.fullName.charAt(0).toUpperCase()}</Avatar>
          <Title>User Profile</Title>
        </Header>

        <Section>
          <SectionTitle>Account Details</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <Label>Account Type</Label>
              <Value>{userData.accountType.charAt(0).toUpperCase() + userData.accountType.slice(1)}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Email</Label>
              <Value>{userData.email}</Value>
            </InfoItem>
          </InfoGrid>
        </Section>

        <Section>
          <SectionTitle>Location Information</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <Label>Country of Residence</Label>
              <Value>{userData.country}</Value>
            </InfoItem>
          </InfoGrid>
        </Section>

        <Section>
          <SectionTitle>Personal Information</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <Label>Full Name</Label>
              <Value>{userData.fullName}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Preferred Currency</Label>
              <Value>{userData.preferredCurrency}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Rate Updates</Label>
              <Value>{userData.wantUpdates ? 'Subscribed' : 'Not subscribed'}</Value>
            </InfoItem>
          </InfoGrid>
        </Section>

        <ButtonGroup>
          <EditButton>Edit Profile</EditButton>
        </ButtonGroup>
      </ProfileCard>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.background};
`;

const TopBar = styled.div`
  max-width: 800px;
  margin: 0 auto 1rem auto;
  padding: 0.5rem 0;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  color: ${props => props.theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateX(-4px);
    background: ${props => props.theme.colors.background};
  }

  &:active {
    transform: translateX(-2px);
  }
`;

const BackIcon = styled.span`
  font-size: 1.2rem;
`;

const ProfileCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${props => props.theme.colors.primary}20;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-size: 0.875rem;
  color: #666;
`;

const Value = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const EditButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary}ee;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default UserProfile; 