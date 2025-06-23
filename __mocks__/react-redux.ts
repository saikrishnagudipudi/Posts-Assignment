import { configureStore, createSlice } from '@reduxjs/toolkit';
import { fetchItems } from '../src/state/slices/itemSlice';

const mockItemsData = [
  { id: 1, userId: 1, title: 'Test Post 1', body: 'This is the body of test post 1' },
  { id: 2, userId: 1, title: 'Another Post', body: 'Body of another test post' },
  { id: 3, userId: 2, title: 'Third Post about something', body: 'Content for the third post' },
];

const mockItemsSlice = createSlice({
  name: 'items',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message ?? 'Failed to fetch';
      });
  },
});

export const mockStore = configureStore({
  reducer: {
    items: mockItemsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState: {
    items: {
      data: mockItemsData,
      status: 'succeeded',
      error: null,
    },
  },
});


const mockUseDispatch = jest.fn(() => {
  const dispatch = jest.fn((action) => {
    if (typeof action === 'function') {
      return action(mockStore.dispatch, mockStore.getState, undefined);
    }
    return mockStore.dispatch(action);
  });
  return dispatch;
});


const mockUseSelector = jest.fn((selector) => {
  const state = mockStore.getState();
  return selector(state);
});

module.exports = {
  ...jest.requireActual('react-redux'),
  useDispatch: mockUseDispatch,
  useSelector: mockUseSelector,
  mockStore,
  mockItemsSlice,
  __esModule: true,
};
