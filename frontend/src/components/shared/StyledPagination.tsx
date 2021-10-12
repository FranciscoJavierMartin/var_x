import React from 'react';
import { styled } from '@material-ui/core';
import { Pagination, PaginationProps, PaginationItem } from '@material-ui/lab';

const StyledPagination = (props: PaginationProps) => {
  const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
    fontFamily: 'Montserrat',
    fontSize: '2rem',
    color: theme.palette.primary.main,
    '&.Mui-selected': {
      color: theme.palette.common.white,
    },
  }));

  return (
    <Pagination
      {...props}
      renderItem={item => <StyledPaginationItem {...item} />}
    />
  );
};

export default StyledPagination;
