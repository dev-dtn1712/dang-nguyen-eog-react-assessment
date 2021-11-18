import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useMetrics from '../hooks/useMetrics';
import Charts from './Charts';
import Dropdown from '../components/Dropdown';

const useStyles = makeStyles(() => createStyles({
  dropdown: {
    textAlign: 'right',
    margin: '20px',
  },
}));

const getMetric = (state: any) => {
  const { getMetrics } = state.metric;
  return getMetrics;
};

const Metrics = () => {
  useMetrics();
  const classes = useStyles();
  const getMetrics = useSelector(getMetric);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <>
      <div className={classes.dropdown}>
        <Dropdown
          options={getMetrics}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </div>
      <Charts metrics={selectedOptions} />
    </>
  );
};

export default Metrics;
