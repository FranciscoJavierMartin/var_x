import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  CircularProgress,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Fields from '../shared/Fields';
import { EmailPassword } from '../../utils/fieldsData';
import { User } from '../../interfaces/user';
import {
  openSnackbar,
  FeedbackActionsTypes,
  SnackbarStatus,
} from '../../contexts/feedback/actions';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.error.main,
  },
  button: {
    fontFamily: 'Montserrat',
  },
}));

interface ConfirmationDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  dispatchFeedback: React.Dispatch<FeedbackActionsTypes>;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  user,
  dispatchFeedback,
}) => {
  const [values, setValues] = useState<{ [key: string]: string }>({
    password: '',
    confirmation: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const classes = useStyles();

  const { password } = EmailPassword(false, false, isVisible, setIsVisible);

  const fields = {
    password: { ...password, placeholder: 'Old password' },
    confirmation: { ...password, placeholder: 'New password' },
  };

  const disabled =
    Object.values(errors).some(error => error) ||
    Object.keys(errors).length !== Object.keys(values).length;

  const handleConfirm = (): void => {
    setIsLoading(true);

    axios
      .post(`${process.env.GATSBY_STRAPI_URL}/auth/local`, {
        identifier: user.email,
        password: values.password,
      })
      .then(response => {
        axios
          .post(
            `${process.env.GATSBY_STRAPI_URL}/users-permissions/change-password`,
            {
              password: values.confirmation,
            },
            {
              headers: {
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          )
          .then(response => {
            setIsLoading(false);
            setIsDialogOpen(false);
            dispatchFeedback(
              openSnackbar(
                SnackbarStatus.Success,
                'Password changed successfully'
              )
            );
            setValues({ password: '', confimation: '' });
          })
          .catch(error => {
            setIsLoading(false);
            console.error(error);
            dispatchFeedback(
              openSnackbar(
                SnackbarStatus.Error,
                'There was a problem changing your password, please try again'
              )
            );
          });
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
        dispatchFeedback(
          openSnackbar(SnackbarStatus.Error, 'Old password invalid')
        );
      });
  };

  const handleCancel = (): void => {
    setIsDialogOpen(false);
    dispatchFeedback(
      openSnackbar(SnackbarStatus.Error, 'Your password has not been changed')
    );
  };

  return (
    <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
      <DialogTitle disableTypography>
        <Typography variant='h3' classes={{ root: classes.title }}>
          Change password
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are changing your account password. Please confirm old password
          and new password.
        </DialogContentText>
        <Fields
          fields={fields}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          color='primary'
          disabled={isLoading}
          classes={{ root: classes.button }}
        >
          Do not change password
        </Button>
        <Button
          onClick={handleConfirm}
          color='secondary'
          disabled={isLoading || disabled}
          classes={{ root: classes.button }}
        >
          {isLoading ? <CircularProgress /> : 'Yes, change my password'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
