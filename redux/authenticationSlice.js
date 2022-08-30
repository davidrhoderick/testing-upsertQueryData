import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  access_token: null,
  token_type: null,
  expires_in: null,
  error: null,
  loading: false,
};

export const authenticationAuthorize = createAsyncThunk(
  'authentication/authorize',
  async (_args, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/authorize');

      return { ...data, csrfToken };
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          status: error.response?.status ? error.response.status : 500,
          data: error.response?.data
            ? { ...error.response.data }
            : { message: 'No error data provided' },
        });
      } else {
        return rejectWithValue(error.toString());
      }
    }
  }
);

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthentication(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticationAuthorize.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(authenticationAuthorize.fulfilled, (_state, action) => {
        return {
          ...action.payload,
          error: null,
          loading: false,
        };
      })
      .addCase(authenticationAuthorize.rejected, (state, action) => {
        return { ...state, error: action.payload, loading: false };
      });
  },
});

export const { setAuthentication } = authenticationSlice.actions;

export default authenticationSlice.reducer;
