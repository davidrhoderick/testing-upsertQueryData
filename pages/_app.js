import * as React from 'react';

import { store } from '../redux/store';
import { Provider as ReduxProvider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}

export default MyApp;
