import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increment(state) {
      console.log('calling increment');
      return { count: state.count + 1 };
    },
  },
});

export const { increment } = countSlice.actions;

export default countSlice.reducer;
