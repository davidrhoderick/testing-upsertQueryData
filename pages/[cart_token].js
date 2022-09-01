import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyCartsQuery } from '../redux/endpoints/carts';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../redux/countSlice';

const CartTokenPage = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.count);

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

  useEffect(() => {
    console.log(`count is ${count}`);
    if (count === 1) {
      console.log('state persisted');
    } else if (count === 0) {
      console.log('state did not persist');
      dispatch(increment());
    }
  }, [count, dispatch, cart_token, cart]);

  // This redirects the application to a new page if the cart_token in the URL doesn't match the one in the data
  useEffect(() => {
    if (isSuccess && cart_token && cart?.cart_token !== cart_token) {
      // replace(
      //   {
      //     pathname: '/[cart_token]',
      //     query: {
      //       cart_token: cart.cart_token,
      //     },
      //   },
      //   { shallow: true }
      // );
      cartsQuery({ cart_token: cart.cart_token }, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, cart_token, cart?.cart_token]);

  return (
    <>
      <h1>URL cart_token: {cart_token}</h1>
      <h1>
        Cart's cart_token: {cart?.cart_token ? cart.cart_token : 'Loading...'}
      </h1>
    </>
  );
};

export default CartTokenPage;
