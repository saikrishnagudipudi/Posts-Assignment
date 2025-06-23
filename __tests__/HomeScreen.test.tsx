import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import HomeScreen from '../src/screens/HomeScreen';
import { useDispatch, useSelector, mockStore } from 'react-redux';
import { fetchItems } from '../src/state/slices/itemSlice';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

const mockUseDispatch = useDispatch as jest.Mock;
const mockUseSelector = useSelector as jest.Mock;

const mockNavigate = jest.fn();
const mockReplace = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  replace: mockReplace,
};

const initialMockItems = [
  { id: 1, userId: 1, title: 'Post 1 Title', body: 'This is the body of test post 1' },
  { id: 2, userId: 1, title: 'Post 2 Title', body: 'Post 2 Body' },
  { id: 3, userId: 2, title: 'Another Great Post', body: 'Another great post body' },
];

const getStateWithItems = (items = initialMockItems) => ({
  items: {
    data: items,
    status: 'succeeded',
    error: null,
  },
});

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDispatch.mockReturnValue(jest.fn());
    mockUseSelector.mockImplementation((selector) => selector(getStateWithItems()));
  });

  test('renders header, search input, and initial items', async () => {
    render(<HomeScreen navigation={mockNavigation} />);
    expect(screen.getByText('Good morning')).toBeOnTheScreen();
    expect(screen.getByText('admin')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Search posts...')).toBeOnTheScreen();
    expect(screen.getByText('Posts')).toBeOnTheScreen();

    await waitFor(() => {
      expect(screen.getByText('Post 1 Title')).toBeOnTheScreen();
      expect(screen.getByText('Post 2 Title')).toBeOnTheScreen();
      expect(screen.getByText('Another Great Post')).toBeOnTheScreen();
    });
  });

  test('dispatches fetchItems on component mount', async () => {
    render(<HomeScreen navigation={mockNavigation} />);
    const dispatchFn = mockUseDispatch.mock.results[0].value;
    expect(dispatchFn).toHaveBeenCalledTimes(1);
    expect(dispatchFn).toHaveBeenCalledWith(expect.any(Function));

    await waitFor(() => {
      const state = mockStore.getState();
      expect(state.items.data.length).toBeGreaterThan(0);
      expect(state.items.status).toBe('succeeded');
    });
  });

  test('filters items based on search query', async () => {
    render(<HomeScreen navigation={mockNavigation} />);
    const searchInput = screen.getByPlaceholderText('Search posts...');
    fireEvent.changeText(searchInput, 'Post 1');

    await waitFor(() => {
      expect(screen.getByText('Post 1 Title')).toBeOnTheScreen();
      expect(screen.queryByText('Post 2 Title')).toBeNull();
      expect(screen.queryByText('Another Great Post')).toBeNull();
    });

    fireEvent.changeText(searchInput, '');
    await waitFor(() => {
      expect(screen.getByText('Post 1 Title')).toBeOnTheScreen();
      expect(screen.getByText('Post 2 Title')).toBeOnTheScreen();
      expect(screen.getByText('Another Great Post')).toBeOnTheScreen();
    });
  });

  test('displays logout confirmation alert on logout button press', () => {
    render(<HomeScreen navigation={mockNavigation} />);
  });

  test('navigates to Login screen on logout confirmation', () => {
    render(<HomeScreen navigation={mockNavigation} />);
  });

  test('cancels logout when cancel button is pressed', () => {
    render(<HomeScreen navigation={mockNavigation} />);
    expect(mockReplace).not.toHaveBeenCalled();
  });

  test('navigates to Detail screen with item data when a card is pressed', async () => {
    render(<HomeScreen navigation={mockNavigation} />);
    await waitFor(() => {
      expect(screen.getByText('Post 1 Title')).toBeOnTheScreen();
    });
    const firstItemCard = screen.getByText('Post 1 Title').parent?.parent;
    fireEvent.press(firstItemCard!);
    expect(mockNavigate).toHaveBeenCalledWith('Detail', { item: initialMockItems[0] });
  });

  test('navigates to Profile screen when avatar is pressed', () => {
    render(<HomeScreen navigation={mockNavigation} />);
    const avatar = screen.getByText('A');
    fireEvent.press(avatar);
    expect(mockNavigate).toHaveBeenCalledWith('Profile');
  });

  test('renders correctly when no items are available', () => {
    mockUseSelector.mockImplementation((selector) => selector(getStateWithItems([])));
    render(<HomeScreen navigation={mockNavigation} />);
    expect(screen.queryByText('Post 1 Title')).toBeNull();
    expect(screen.queryByText('Post 2 Title')).toBeNull();
  });

  test('renders item card with correct structure and content', async () => {
    mockUseSelector.mockImplementation((selector) =>
      selector(getStateWithItems([{ id: 1, userId: 1, title: 'Single Post', body: 'Body of single post' }]))
    );
    render(<HomeScreen navigation={mockNavigation} />);
    await waitFor(() => {
      expect(screen.getByText('Single Post')).toBeOnTheScreen();
    });
    expect(screen.getByText('User 1')).toBeOnTheScreen();
    expect(screen.getByText('2h ago')).toBeOnTheScreen();
    expect(screen.getByText('Body of single post')).toBeOnTheScreen();
    expect(screen.getByText('33 likes')).toBeOnTheScreen();
    expect(screen.getByText('7 comments')).toBeOnTheScreen();
  });
});
