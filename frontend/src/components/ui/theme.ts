import { createTheme } from '@material-ui/core';

const green = '#99B898';
const darkGreen = '#708670';
const tan = '#FECEA8';
const lightRed = '#FF847C';
const red = '#E84A5F';
const offBlack = '#2A363B';
const grey = '#747474';
const white = '#FFF';
export const error = '#FF3232';
export const success = '#4BB543';

const theme = createTheme({
  palette: {
    primary: {
      main: green,
    },
    secondary: {
      main: darkGreen,
    },
    common: {
      tan,
      lightRed,
      red,
      offBlack,
      white,
      error,
      success,
    },
  },
  typography: {
    h1: {
      fontSize: '4.5rem',
      fontFamily: 'Philosopher',
      fontStyle: 'italic',
      fontWeight: 700,
      color: green,
    },
    h2: {
      fontFamily: 'Montserrat',
      fontSize: '3rem',
      fontWeight: 500,
      color: white,
    },
    h3: {
      fontFamily: 'Montserrat',
      fontSize: '2rem',
      fontWeight: 300,
      color: green,
    },
    h4: {
      fontFamily: 'Philosopher',
      fontStyle: 'italic',
      fontWeight: 700,
      fontSize: '3rem',
      color: white,
    },
    h5: {
      fontFamily: 'Philosopher',
      fontSize: '2rem',
      fontWeight: 700,
      fontStyle: 'italic',
      color: white,
    },
    body1: {
      fontFamily: 'Montserrat',
      fontSize: '1.5rem',
      color: grey,
    },
    body2: {
      fontFamily: 'Montserrat',
      fontSize: '1.5rem',
      color: white,
    },
  },
  overrides: {
    MuiChip: {
      root: {
        backgroundColor: darkGreen,
      },
      label: {
        fontFamily: 'Montserrat',
        fontSize: '1.5rem',
        color: white,
        fontWeight: 400,
      },
    },
  },
});

export default theme;
