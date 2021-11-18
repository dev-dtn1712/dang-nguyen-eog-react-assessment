/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
// import Container from '@material-ui/core/Container';
import moment from 'moment';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import useMultipleMeasureMents from '../hooks/useMultipleMeasureMents';

const getMultipleMeasurement = (state: any) => {
  const { getMultipleMeasurements } = state.metricsMeasurements;
  return getMultipleMeasurements;
};

interface Metrics {
  metrics: Array<string>,
}

const Charts = ({ metrics }: Metrics) => {
  useMultipleMeasureMents();
  const multipleMeasurements = useSelector(getMultipleMeasurement);

  const formatXAxis = (xItem: string) => {
    xItem = moment(parseInt(xItem, 10)).format('LT');
    return xItem;
  };

  const measurementData = useMemo(() => {
    const { getMultipleMeasurements } = multipleMeasurements;
    if (!getMultipleMeasurements?.length) {
      return [];
    }
    const metricLength = getMultipleMeasurements[0].measurements.length;
    const dataChartFormat = [];

    for (let index = 0; index < metricLength; index += 1) {
      const obj: { [index: string]:any } = {};
      for (let j = 0; j < getMultipleMeasurements.length; j += 1) {
        obj[getMultipleMeasurements[j].measurements[index].metric] = getMultipleMeasurements[j].measurements[index].value;
        obj.name = getMultipleMeasurements[j].measurements[index].at;
      }
      dataChartFormat.push(obj);
    }
    return dataChartFormat;
  }, [multipleMeasurements]);

  if (!metrics.length) return null;

  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={measurementData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          allowDataOverflow
          tickFormatter={formatXAxis}
        />
        <YAxis
          domain={['auto', 'auto']}
          scale="linear"
          padding={{ top: 10, bottom: 10 }}
          tickCount={10}
        />
        <Legend />

        {metrics
          ? metrics.map(metric => (
            <Line
              type="monotone"
              key={metric}
              dataKey={metric}
              strokeOpacity="1"
              stroke="#8743cd"
              activeDot={{ r: 8 }}
              isAnimationActive={false}
              dot={false}
            />
          ))
          : null}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Charts;
