import React from 'react';
import { IconButton } from '@material-ui/core';

import EmailAdornment from '../images/EmailAdornment';
import PasswordAdornment from '../images/PasswordAdornment';
import HidePassword from '../images/HidePassword';
import ShowPassword from '../images/ShowPassword';

export const EmailPassword = (
  classes: any,
  hideEmail: boolean,
  hidePassword: boolean,
  isPasswordVisible: boolean,
  setIsPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>,
  isWhite?: boolean
) => ({
  email: {
    helperText: 'Invalid email',
    placeholder: 'Email',
    type: 'text',
    hidden: hideEmail,
    startAdornment: (
      <span className={classes.emailAdornment}>
        <EmailAdornment color={isWhite ? '#fff' : undefined} />
      </span>
    ),
  },
  password: {
    helperText:
      'Your password must be at least eight characters and include one uppercase letter, one number, and one special character',
    placeholder: 'Password',
    hidden: hidePassword,
    type: isPasswordVisible ? 'text' : 'password',
    startAdornment: <PasswordAdornment color={isWhite ? '#fff' : undefined} />,
    endAdornment: (
      <IconButton
        classes={{ root: classes.visibleIcon }}
        onClick={() => setIsPasswordVisible(prevState => !prevState)}
      >
        {isPasswordVisible ? (
          <ShowPassword color={isWhite ? '#fff' : undefined} />
        ) : (
          <HidePassword color={isWhite ? '#fff' : undefined} />
        )}
      </IconButton>
    ),
  },
});
