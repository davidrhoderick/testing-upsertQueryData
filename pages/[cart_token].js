import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { authenticationAuthorize } from '../redux/authenticationSlice';
import { useLazyCartsQuery } from '../redux/endpoints/carts';

const useUpdateCartToken = ({ cart_token, isSuccess }) => {
  const {
    query: { cart_token: routerCartToken },
    replace,
  } = useRouter();

  useEffect(() => {
    if (isSuccess && cart_token && cart_token !== routerCartToken) {
      replace(
        {
          pathname: '/[cart_token]',
          query: {
            cart_token,
          },
        },
        { shallow: true }
      );
    }
  }, [isSuccess, routerCartToken, replace, cart_token]);
};

const CartTokenPage = () => {
  const {
    query: { cart_token },
  } = useRouter();

  const dispatch = useDispatch();

  const { access_token, expires_in, loading } = useSelector(
    (state) => state.authentication
  );

  useEffect(() => {
    if (!loading && !access_token) {
      console.log(loading, access_token);
      dispatch(authenticationAuthorize())
        .then(unwrapResult)
        .catch((reqError) => {
          console.error(reqError);
        });
    }
  }, [loading, access_token, expires_in, dispatch]);

  const [cartsQuery, { originalArgs, data: cart, isUninitialized, isSuccess }] =
    useLazyCartsQuery();

  useEffect(() => {
    if (access_token) {
      if (
        (isUninitialized && cart_token) ||
        (isSuccess && originalArgs.cart_token !== cart_token)
      ) {
        cartsQuery({ cart_token }, true);
      }
    }
  }, [
    access_token,
    isUninitialized,
    cartsQuery,
    cart_token,
    isSuccess,
    cart?.cart_token,
    originalArgs,
  ]);

  useUpdateCartToken({ cart_token: cart?.cart_token, isSuccess });

  return <h1>{cart_token}</h1>;
};

export default CartTokenPage;
