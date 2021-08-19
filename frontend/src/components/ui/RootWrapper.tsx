import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { ApolloWrapper } from '../../apollo/ApolloWrapper';
import { UserWrapper, FeedbackWrapper } from '../../contexts';
import theme from './theme';

interface RootWrapperProps {
  element: any;
}

const RootWrapper: React.FC<RootWrapperProps> = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloWrapper>
        <UserWrapper>
          <FeedbackWrapper>{element}</FeedbackWrapper>
        </UserWrapper>
      </ApolloWrapper>
    </ThemeProvider>
  );
};

export default RootWrapper;
