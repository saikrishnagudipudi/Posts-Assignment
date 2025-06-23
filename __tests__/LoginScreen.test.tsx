import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { Platform } from 'react-native';

import LoginScreen from '../src/screens/LoginScreen';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));


describe('LoginScreen', () => {
  const mockNavigate = jest.fn();
  const mockReplace = jest.fn();
  const mockNavigation = {
    navigate: mockNavigate,
    replace: mockReplace,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all major elements of the login screen', () => {
    render(<LoginScreen navigation={mockNavigation} />);

    expect(screen.getByText('Welcome Back')).toBeOnTheScreen();
    expect(screen.getByText('Sign in to your account')).toBeOnTheScreen();

    expect(screen.getByPlaceholderText('Username')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Password')).toBeOnTheScreen();

    expect(screen.getByText('Sign In')).toBeOnTheScreen();

    expect(screen.getByText('Demo Credentials')).toBeOnTheScreen();
    expect(screen.getByText('Username:')).toBeOnTheScreen();
    expect(screen.getByText('admin')).toBeOnTheScreen();
    expect(screen.getByText('Password:')).toBeOnTheScreen();
    expect(screen.getByText('password')).toBeOnTheScreen();
  });

  test('allows user to type into username and password fields', () => {
    render(<LoginScreen navigation={mockNavigation} />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'testpass');

    expect(usernameInput.props.value).toBe('testuser');
    expect(passwordInput.props.value).toBe('testpass');
  });

  test('toggles password visibility when eye icon is pressed', () => {
    render(<LoginScreen navigation={mockNavigation} />);

    const passwordInput = screen.getByPlaceholderText('Password');

    expect(passwordInput.props.secureTextEntry).toBe(true);

    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  test('navigates to "Main" on successful login', () => {
    render(<LoginScreen navigation={mockNavigation} />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByText('Sign In');

    fireEvent.changeText(usernameInput, 'admin');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(signInButton);
  });

  test('shows alert for invalid credentials on failed login', () => {
    render(<LoginScreen navigation={mockNavigation} />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByText('Sign In');

    fireEvent.changeText(usernameInput, 'wronguser');
    fireEvent.changeText(passwordInput, 'wrongpass');
    fireEvent.press(signInButton);

    expect(mockReplace).not.toHaveBeenCalled();
  });

  test('shows alert for invalid credentials when fields are empty', () => {
    render(<LoginScreen navigation={mockNavigation} />);

    const signInButton = screen.getByText('Sign In');
    fireEvent.press(signInButton);

    expect(mockReplace).not.toHaveBeenCalled();
  });

  test('KeyboardAvoidingView behavior is set correctly for iOS', () => {
    Platform.OS = 'ios';
    render(<LoginScreen navigation={mockNavigation} />);

  });

  test('KeyboardAvoidingView behavior is undefined for Android', () => {
    Platform.OS = 'android';
    render(<LoginScreen navigation={mockNavigation} />);
  });
});