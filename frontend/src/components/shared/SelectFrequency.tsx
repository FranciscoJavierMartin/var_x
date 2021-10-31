import React from 'react';
import { Select, Chip, MenuItem, makeStyles } from '@material-ui/core';
import { frequencies } from '../../constants/data';

const useStyles = makeStyles(theme => ({
  chipRoot: {
    backgroundColor: theme.palette.common.white,
    height: '3rem',
    borderRadius: 50,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  chipLabel: {
    color: theme.palette.common.white,
  },
  select: {
    '&.MuiSelect-select': {
      paddingRight: 0,
    },
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
  },
  menuItem: {
    color: theme.palette.common.white,
  },
}));

interface SelectFrequencyProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  chip?: JSX.Element;
}

const SelectFrequency: React.FC<SelectFrequencyProps> = ({
  value,
  setValue,
  chip,
}) => {
  const classes = useStyles();

  return (
    <Select
      classes={{ select: classes.select }}
      value={value}
      disableUnderline
      IconComponent={() => null}
      MenuProps={{ classes: { paper: classes.menu } }}
      onChange={event => {
        console.log(event.target.value);
        setValue(event.target.value as string);
      }}
      renderValue={(selected: any) =>
        chip || (
          <Chip
            label={selected}
            classes={{
              root: classes.chipRoot,
              label: classes.chipLabel,
            }}
          />
        )
      }
    >
      {frequencies.map(frequency => (
        <MenuItem
          key={frequency}
          value={frequency}
          classes={{ root: classes.menuItem }}
        >
          {frequency}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectFrequency;
