import "../styles/globals.css";

import { AppProps } from "next/app";
import React, { FC } from "react";
import { Provider } from "react-redux";

import { wrapper } from "../lib/store";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default MyApp;
