import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMetrics from '../hooks/useMetrics';
import useNewMeasurementData from '../hooks/useNewMeasurementData';
import Charts from './Charts';
import MetricsCards from './MetricsCards';
import Dropdown from '../components/Dropdown';

const useStyles = makeStyles(() => createStyles({
  dropdown: {
    textAlign: 'right',
    margin: '20px',
  },
  loadingContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const getMetric = (state: any) => {
  const { getMetrics } = state.metric;
  return getMetrics;
};

const Metrics = () => {
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  useMetrics();
  useNewMeasurementData(selectedOptions);
  const metrics = useSelector(getMetric);

  if (metrics.length === 0) {
    return (
      <Container maxWidth="lg" className={classes.loadingContainer}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <div className={classes.dropdown}>
        <Dropdown
          options={metrics}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </div>
      <MetricsCards metrics={selectedOptions} />
      <Charts metrics={selectedOptions} />
    </>
  );
};

export default Metrics;
