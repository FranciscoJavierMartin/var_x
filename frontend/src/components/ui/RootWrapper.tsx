import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';

interface RootWrapperProps {
  element: any;
}

const RootWrapper: React.FC<RootWrapperProps> = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};

export default RootWrapper;
