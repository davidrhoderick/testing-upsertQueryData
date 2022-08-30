import nock from 'nock';
import { api } from '../api';

nock('http://localhost:3000')
  .persist()
  .get('/api/carts/__c__asdfghjkl12345==')
  .reply(200, { cart_token: 'newCartToken' })
  .get('/api/carts/newCartToken')
  .reply(200, { cart_token: 'newCartToken' });

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    carts: builder.query<any, { cart_token: string }>({
      query: ({ cart_token }) => ({
        url: `carts/${cart_token}`,
        method: 'GET',
      }),
      transformResponse: (response) => ({
        ...(response as any),
        order: {
          ...(response as any).order,
          shipping_profile_id:
            (response as any).order.shipping_profile_id ?? '',
        },
      }),
      async onQueryStarted({ cart_token }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.cart_token !== cart_token) {
            dispatch(
              api.util.upsertQueryData(
                'carts',
                { cart_token: data.cart_token },
                data
              )
            );
          }
        } catch {}
      },
    }),
  }),
  overrideExisting: true,
});

export const { useCartsQuery, useLazyCartsQuery } = extendedApi;
