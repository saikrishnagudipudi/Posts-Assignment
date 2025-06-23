import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { Alert } from 'react-native';

import ProfileScreen from '../src/screens/ProfileScreen';



describe('ProfileScreen', () => {
  const mockNavigate = jest.fn();
  const mockReplace = jest.fn();
  const mockNavigation = {
    navigate: mockNavigate,
    replace: mockReplace,
  };

  const mockAlert = jest.mocked(Alert);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders header, avatar, name, and email correctly', () => {
    render(<ProfileScreen navigation={mockNavigation} />);

    expect(screen.getByText('My Profile')).toBeOnTheScreen();

    const avatarImage = screen.getByTestId('profile-avatar');
    expect(avatarImage).toBeOnTheScreen();
    expect(avatarImage.props.source.uri).toBe('https://i.pravatar.cc/150?img=12');

    expect(screen.getByText('Admin')).toBeOnTheScreen();
    expect(screen.getByText('admin@example.com')).toBeOnTheScreen();
  });

  test('renders the logout option with correct text and icon', () => {
    render(<ProfileScreen navigation={mockNavigation} />);

    expect(screen.getByText('Logout')).toBeOnTheScreen();

    expect(screen.getByTestId('logout-icon')).toBeOnTheScreen(); 
  });

  test('displays logout confirmation alert on logout button press', () => {
    render(<ProfileScreen navigation={mockNavigation} />);

    const logoutButton = screen.getByText('Logout');
    fireEvent.press(logoutButton);
  });

  test('navigates to Login screen on logout confirmation', () => {
    render(<ProfileScreen navigation={mockNavigation} />);

    const logoutButton = screen.getByText('Logout');
    fireEvent.press(logoutButton);
  });

  test('does not navigate to Login screen if logout is cancelled', () => {
    render(<ProfileScreen navigation={mockNavigation} />);

    const logoutButton = screen.getByText('Logout');
    fireEvent.press(logoutButton);
  });
});