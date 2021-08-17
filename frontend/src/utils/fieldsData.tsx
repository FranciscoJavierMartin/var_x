import React from 'react';
import { IconButton } from '@material-ui/core';

import EmailAdornment from '../images/EmailAdornment';
import passwordAdornment from '../images/password-adornment.svg';
import hidePasswordIcon from '../images/hide-password.svg';
import showPasswordIcon from '../images/show-password.svg';

export const EmailPassword = (
  classes: any,
  hideEmail: boolean,
  hidePassword: boolean,
  isPasswordVisible: boolean,
  setIsPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>
) => ({
  email: {
    helperText: 'Invalid email',
    placeholder: 'Email',
    type: 'text',
    hidden: hideEmail,
    startAdornment: (
      <span className={classes.emailAdornment}>
        <EmailAdornment />
      </span>
    ),
  },
  password: {
    helperText:
      'Your password must be at least eight characters and include one uppercase letter, one number, and one special character',
    placeholder: 'Password',
    hidden: hidePassword,
    type: isPasswordVisible ? 'text' : 'password',
    startAdornment: <img src={passwordAdornment} alt='password icon' />,
    endAdornment: (
      <IconButton
        classes={{ root: classes.visibleIcon }}
        onClick={() => setIsPasswordVisible(prevState => !prevState)}
      >
        <img
          src={isPasswordVisible ? showPasswordIcon : hidePasswordIcon}
          alt={`${isPasswordVisible ? 'Show' : 'Hide'} password icon`}
        />
      </IconButton>
    ),
  },
});
