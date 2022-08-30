import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { RootState } from './store';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '/' }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['data'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }, { getState }) => {
    const { access_token, token_type, csrfToken, error } = (
      getState() as RootState
    ).authentication;

    if (access_token && token_type) {
      try {
        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params,
          withCredentials: true,
          headers: {
            Authorization: `${token_type} ${access_token}`,
            'CSRF-Token': csrfToken,
          },
        });
        return { data: result.data };
      } catch (axiosError) {
        const reqError = axiosError as AxiosError;

        return {
          error: {
            status: reqError.response?.status ? reqError.response.status : 500,
            data: reqError.response?.data ? reqError.response.data : reqError,
          },
        };
      }
    } else {
      if (!error) {
        return {
          error: {
            status: 401,
            data: 'No access token requested',
          },
        };
      } else {
        return {
          error: {
            status: error.status,
            data: error.data,
          },
        };
      }
    }
  };

export const api = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: '/api/vrio/' }),
  reducerPath: 'vrioApi',
  endpoints: () => ({}),
});
