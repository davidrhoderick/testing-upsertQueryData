import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { authenticationAuthorize } from '../redux/authenticationSlice';
import { useLazyCartsQuery } from '../redux/endpoints/carts';

const CartTokenPage = () => {
  const {
    query: { cart_token },
  } = useRouter();

  const dispatch = useDispatch();

  const { access_token, expires_in, error, loading } = useSelector(
    (state) => state.authentication
  );

  useEffect(() => {
    if (!error && !loading && !access_token) {
      dispatch(authenticationAuthorize({ organization }))
        .then(unwrapResult)
        .catch((reqError) => {
          rollbar.error('Authentication failed', reqError);
          console.error(reqError);
        });
    }
  }, [loading, access_token, expires_in, error, dispatch]);

  return <h1>{cart_token}</h1>;
};

export default CartTokenPage;
