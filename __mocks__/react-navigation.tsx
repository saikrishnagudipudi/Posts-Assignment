import React from 'react';

export const NavigationContainer = ({ children }: any) => <>{children}</>;

export const createStackNavigator = jest.fn(() => ({
  Navigator: ({ children }: any) => <>{children}</>,
  Screen: ({ children }: any) => <>{children}</>,
}));

export const createBottomTabNavigator = jest.fn(() => ({
  Navigator: ({ children }: any) => <>{children}</>,
  Screen: ({ children }: any) => <>{children}</>,
}));

export const useNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  replace: jest.fn(),
  push: jest.fn(),
});

export const useRoute = () => ({
  params: {},
});