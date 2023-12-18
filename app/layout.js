'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import './globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import { Provider } from 'react-redux';
import store from '@/src/redux/store';

import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './theme';

export default function RootLayout({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const currentTheme = isDarkTheme ? darkTheme : lightTheme;
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };
  return (
    <html lang="en">
      <Head>
        <Link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Provider store={store}>
          <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Box toggleTheme={toggleTheme}>{children}</Box>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
