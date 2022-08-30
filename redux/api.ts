import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

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
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
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
  };

export const api = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: '/api/' }),
  reducerPath: 'api',
  endpoints: () => ({}),
});
