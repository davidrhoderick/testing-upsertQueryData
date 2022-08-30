import { api } from '../api';

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
