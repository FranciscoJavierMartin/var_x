import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Grid,
  IconButton,
  CircularProgress,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import { User } from '../../interfaces/user';
import { FeedbackContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';
import { setUser, UserActionsTypes } from '../../contexts/user/actions';

import BackwardsOutline from '../../images/BackwardsOutline';
import editIcon from '../../images/edit.svg';
import saveIcon from '../../images/save.svg';

const useStyles = makeStyles(theme => ({
  editContainer: {
    borderLeft: `4px solid ${theme.palette.common.white}`,
  },
  icon: {
    height: '8rem',
    width: '8rem',
  },
}));

interface EditProps {
  user: User;
  dispatchUser: React.Dispatch<UserActionsTypes>;
  setSelectedSetting: React.Dispatch<React.SetStateAction<string>>;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  changesMade: boolean;
  details: { [key: string]: string };
  locations: { [key: string]: string };
  detailSlot: number;
  locationSlot: number;
}

const Edit: React.FC<EditProps> = ({
  user,
  dispatchUser,
  setSelectedSetting,
  edit,
  setEdit,
  changesMade,
  details,
  locations,
  detailSlot,
  locationSlot,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatchFeedback } = useContext(FeedbackContext);

  const classes = useStyles();
  const theme = useTheme();

  const handleEdit = (): void => {
    setEdit(prevState => !prevState);

    if (edit && changesMade) {
      setIsLoading(true);

      const { password, ...newDetails } = details;

      axios
        .post(
          `${process.env.GATSBY_STRAPI_URL}/users-permissions/set-settings`,
          {
            details: newDetails,
            detailSlot,
            location: locations,
            locationSlot,
          },
          { headers: { Authorization: `Bearer ${user.jwt}` } }
        )
        .then(response => {
          console.log(response);
          setIsLoading(false);
          dispatchFeedback(
            openSnackbar(SnackbarStatus.Success, 'Settings saved successfully')
          );
          dispatchUser(
            setUser({ ...response.data, jwt: user.jwt, onboarding: true })
          );
        })
        .catch(error => {
          setIsLoading(false);
          console.error(error);
          dispatchFeedback(
            openSnackbar(
              SnackbarStatus.Error,
              'There was a problem saving your settings, please try again'
            )
          );
        });
    }
  };

  return (
    <Grid
      item
      container
      xs={6}
      justifyContent='space-evenly'
      alignItems='center'
      classes={{ root: classes.editContainer }}
    >
      <Grid item>
        <IconButton onClick={() => setSelectedSetting('')}>
          <span className={classes.icon}>
            <BackwardsOutline color={theme.palette.common.white} />
          </span>
        </IconButton>
      </Grid>
      <Grid item>
        {isLoading ? (
          <CircularProgress color='secondary' size='8rem' />
        ) : (
          <IconButton disabled={isLoading} onClick={handleEdit}>
            <img
              src={edit ? saveIcon : editIcon}
              alt={`${edit ? 'save' : 'edit'} settings`}
              className={classes.icon}
            />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default Edit;
