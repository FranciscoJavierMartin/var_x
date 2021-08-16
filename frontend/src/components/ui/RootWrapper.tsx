import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { ApolloWrapper } from '../../apollo/ApolloWrapper';
import theme from './theme';

interface RootWrapperProps {
  element: any;
}

const RootWrapper: React.FC<RootWrapperProps> = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloWrapper>{element}</ApolloWrapper>
    </ThemeProvider>
  );
};

export default RootWrapper;
