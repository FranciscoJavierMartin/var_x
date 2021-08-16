import React from 'react';
import clsx from 'clsx';
import { Grid, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  swatchesContainer: {
    marginTop: '0.5rem',
    '&:not(:first-child)': {
      marginLeft: '-0.5rem',
    },
  },
  swatch: {
    border: `3px solid ${theme.palette.common.white}`,
    height: '3rem',
    width: '3rem',
    minWidth: 0,
    borderRadius: 50,
  },
  selected: {
    borderColor: theme.palette.secondary.main,
  },
}));

interface SwatchesProps {
  colors: string[];
  selectedColor: string;
  setSelectedColor: React.Dispatch<string>;
}

const Swatches: React.FC<SwatchesProps> = ({
  colors,
  selectedColor,
  setSelectedColor,
}) => {
  const classes = useStyles();

  return (
    <Grid item container>
      {colors.sort().map(color => (
        <Grid item key={color} classes={{ root: classes.swatchesContainer }}>
          <Button
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: color }}
            classes={{
              root: clsx(classes.swatch, {
                [classes.selected]: selectedColor === color,
              }),
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Swatches;
