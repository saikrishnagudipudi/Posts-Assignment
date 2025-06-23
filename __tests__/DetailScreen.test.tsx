import React from 'react';
import { render } from '@testing-library/react-native';
import DetailScreen from '../src/screens/DetailScreen';

describe('DetailScreen', () => {
  it('displays title and body from navigation params', () => {
    const route = {
      params: {
        item: {
          title: 'Test Title',
          body: 'This is a test body',
        },
      },
    };

    const { getByText } = render(<DetailScreen route={route} />);

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('This is a test body')).toBeTruthy();
  });
});
