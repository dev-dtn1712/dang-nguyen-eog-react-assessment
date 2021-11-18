import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface Metrics {
  metrics: Array<string>,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  mb5: {
    marginBottom: theme.spacing(4),
  },
  metricCard: {
    width: '100%',
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const getNewMeasurementData = (state: any) => state.metricsMeasurements.getMultipleMeasurements;

const MetricsCards = ({ metrics }: Metrics) => {
  if (!metrics.length) return null;

  const classes = useStyles();

  const { getMultipleMeasurements: data } = useSelector(getNewMeasurementData);
  const newMetricsData = data.map((metric: any) => metric.measurements.slice(-1)[0]);
  const filterMetricData = newMetricsData.filter(
    (metricData: any) => metrics.includes(metricData.metric),
  );

  return (
    <Container maxWidth="lg" className={classes.mb5}>
      <Grid container spacing={3}>
        {!!filterMetricData.length && filterMetricData.map((metricData: any) => (
          <Grid
            key={metricData.metric}
            container
            item
            xs={4}
            spacing={3}
          >
            <Card className={classes.metricCard}>
              <CardContent>
                <Typography variant="h6"> {metricData.metric} </Typography>
                <Typography variant="h4"> {metricData.value} </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MetricsCards;
