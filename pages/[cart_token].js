import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyCartsQuery } from '../redux/endpoints/carts';

const CartTokenPage = () => {
  const {
    query: { cart_token },
    replace,
  } = useRouter();

  const [cartsQuery, { originalArgs, data: cart, isUninitialized, isSuccess }] =
    useLazyCartsQuery();

  // This calls RTK Query API endpoint to fetch the cart
  useEffect(() => {
    if (
      (isUninitialized && cart_token) ||
      (isSuccess && originalArgs.cart_token !== cart_token)
    ) {
      cartsQuery({ cart_token }, true);
    }
  }, [
    isUninitialized,
    cartsQuery,
    cart_token,
    isSuccess,
    cart?.cart_token,
    originalArgs,
  ]);

  // This redirects the application to a new page if the cart_token in the URL doesn't match the one in the data
  useEffect(() => {
    if (isSuccess && cart_token && cart?.cart_token !== cart_token) {
      replace(
        {
          pathname: '/[cart_token]',
          query: {
            cart_token: cart.cart_token,
          },
        },
        { shallow: true }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, cart_token, cart?.cart_token]);

  return <h1>{cart_token}</h1>;
};

export default CartTokenPage;
