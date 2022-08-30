import * as React from 'react';

import Head from 'next/head';

import { store } from '../redux/store';
import { Provider as ReduxProvider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Secure Checkout</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    </>
  );
}

export default MyApp;
