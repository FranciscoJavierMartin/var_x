import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import FunctionContainer from './FunctionContainer';
import { Filters } from '../../interfaces/filters';
import DescriptionContainer from './DescriptionContainer';
import { Edge } from '../../interfaces/category-products';

const useStyles = makeStyles(theme => ({
  toolbar: {
    border: `5px solid ${theme.palette.primary.main}`,
    borderRadius: 25,
    width: '95%',
    height: 'auto',
    marginBottom: '5rem',
  },
}));

interface DynamicToolbarProps {
  filterOptions: Filters;
  setFilterOptions: React.Dispatch<React.SetStateAction<Filters>>;
  name: string;
  description: string;
  layout: 'grid' | 'list';
  setLayout: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
  sortOptions: {
    label: string;
    active: boolean;
    function: (data: Edge[]) => Edge[];
  }[];
  setSortOptions: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        active: boolean;
        function: (data: Edge[]) => Edge[];
      }[]
    >
  >;
}

const DynamicToolbar: React.FC<DynamicToolbarProps> = ({
  filterOptions,
  setFilterOptions,
  name,
  description,
  layout,
  setLayout,
  sortOptions,
  setSortOptions,
}) => {
  const classes = useStyles();
  const [option, setOption] = useState<'sort' | 'filter' | null>(null);

  return (
    <Grid item container direction='column' classes={{ root: classes.toolbar }}>
      <FunctionContainer
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        option={option}
        setOption={setOption}
        sortOptions={sortOptions}
        setSortOptions={setSortOptions}
      />
      {option === null && (
        <DescriptionContainer
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
        />
      )}
    </Grid>
  );
};

export default DynamicToolbar;
