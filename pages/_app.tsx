import React from 'react';
import { AppProps } from 'next/app';

import '../styles/global.css';

// noinspection JSUnusedGlobalSymbols
export default function App({ Component, pageProps }: AppProps) {
  return <Component { ...pageProps } />;
}
