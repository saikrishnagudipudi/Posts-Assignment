import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


interface Item {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface ItemState {
  data: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchItems = createAsyncThunk<Item[]>('items/fetchItems', async () => {
  const response = await axios.get<Item[]>('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default itemSlice.reducer;
