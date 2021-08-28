import React from 'react';
import {
  Grid,
  TextField,
  InputAdornment,
  makeStyles,
  Theme,
} from '@material-ui/core';
import validate from '../../utils/validate';

const useStyles = makeStyles<Theme, { isWhite?: boolean; fullWidth?: boolean }>(
  theme => ({
    textField: {
      width: ({ fullWidth }) => (fullWidth ? undefined : '20rem'),
      [theme.breakpoints.down('xs')]: {
        width: ({ fullWidth }) => (fullWidth ? undefined : '15rem'),
      },
    },
    input: {
      color: ({ isWhite }) =>
        isWhite ? theme.palette.common.white : theme.palette.secondary.main,
    },
    visibleIcon: {
      padding: 0,
    },
  })
);

interface FieldsProps {
  fields: { [key: string]: any };
  errors: { [key: string]: any };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  values: { [key: string]: string };
  setValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  isWhite?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Fields: React.FC<FieldsProps> = ({
  fields,
  errors,
  setErrors,
  values,
  setValues,
  isWhite,
  disabled,
  fullWidth,
}) => {
  const classes = useStyles({ isWhite, fullWidth });

  return (
    <>
      {Object.entries(fields).map(([field, fieldValues]) => {
        const validateHelper = (
          event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => {
          return validate({ [field]: event.target.value });
        };
        return !(fieldValues as any).hidden ? (
          <Grid item key={field}>
            <TextField
              value={values[field]}
              onChange={e => {
                const valid = validateHelper(e);
                if (errors[field] || valid[field]) {
                  setErrors(prevState => ({
                    ...prevState,
                    [field]: !valid[field],
                  }));
                }
                setValues(prevState => ({
                  ...prevState,
                  [field]: e.target.value,
                }));
              }}
              onBlur={e => {
                const valid = validateHelper(e);
                setErrors(prevState => ({
                  ...prevState,
                  [field]: !valid[field],
                }));
              }}
              classes={{ root: classes.textField }}
              type={fieldValues.type}
              disabled={disabled}
              fullWidth={fullWidth}
              placeholder={fieldValues.placeholder}
              error={errors[field]}
              helperText={errors[field] && fieldValues.helperText}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    {fieldValues.startAdornment}
                  </InputAdornment>
                ),
                endAdornment: fieldValues.hasOwnProperty('endAdornment') ? (
                  <InputAdornment position='end'>
                    {fieldValues.endAdornment}
                  </InputAdornment>
                ) : undefined,
                classes: { input: classes.input },
              }}
            />
          </Grid>
        ) : null;
      })}
    </>
  );
};

export default Fields;
